"use strict";

import React, {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };
  return debounced;
}
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Color Parsing Helper for the Canvas Vectors ---
const parseRgbColor = (colorString: string) => {
  if (!colorString) return null;
  const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  return null;
};

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100;
    return containerSize * percentage;
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2;
}

// --- Context and Types for Physics Context ---
type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  gravity?: { x: number; y: number };
  resetOnResize?: boolean;
  grabCursor?: boolean;
  className?: string;
  showVectorGuide?: boolean;
  ctaRef?: React.RefObject<HTMLButtonElement | null>;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  bodyType?: "rectangle" | "circle";
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

// --- Individual Rigid Rigid-body Item ---
export const PhysicsItem = ({
  children,
  className,
  matterBodyOptions = {
    friction: 0.2,
    restitution: 0.4,
    density: 0.002,
    isStatic: false,
  },
  bodyType = "rectangle",
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    context.registerElement(idRef.current, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      isDraggable,
      x,
      y,
      angle,
      ...props,
    });

    return () => context.unregisterElement(idRef.current);
  }, [props, children, matterBodyOptions, isDraggable]);

  return (
    <div
      ref={elementRef}
      className={cn(
        "absolute z-20 select-none will-change-transform",
        className,
        isDraggable && "pointer-events-auto"
      )}
    >
      {children}
    </div>
  );
};

// --- Main Engine Frame Component ---
export const InteractivePhysicsFooter = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      className,
      showVectorGuide = true,
      ctaRef,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engine = useRef(Engine.create());
    const render = useRef<Render | null>(null);
    const runner = useRef<Runner | null>(null);
    const bodiesMap = useRef(new Map<string, PhysicsBody>());
    const frameId = useRef<number | null>(null);
    const mouseConstraint = useRef<Matter.MouseConstraint | null>(null);
    const mouseDown = useRef(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const isRunning = useRef(false);

    // Dynamic Tracking Reference for Cursor Vector Guides
    const mousePosRef = useRef({ x: null as number | null, y: null as number | null });
    const resolvedColorsRef = useRef({ strokeStyle: { r: 156, g: 163, b: 175 } });

    // Dynamic Theme Color Synchronization
    useEffect(() => {
      const temp = document.createElement("div");
      temp.style.display = "none";
      document.body.appendChild(temp);

      const updateColors = () => {
        temp.style.color = "var(--muted-foreground)";
        const computed = getComputedStyle(temp).color;
        const parsed = parseRgbColor(computed);
        if (parsed) resolvedColorsRef.current.strokeStyle = parsed;
      };

      updateColors();
      const obs = new MutationObserver(updateColors);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      return () => {
        obs.disconnect();
        if (temp.parentNode) temp.parentNode.removeChild(temp);
      };
    }, []);

    // Vector Trace Rendering Function
    const drawInteractiveVector = useCallback(() => {
      if (!canvasRef.current || !ctaRef?.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const mouse = mousePosRef.current;
      if (mouse.x === null || mouse.y === null) return;

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      // Translate global coordinates relative to layout scope
      const localX = mouse.x - containerRect.left;
      const localY = mouse.y - containerRect.top;

      // Validate coordinates are within bounding limits
      if (localX < 0 || localX > containerRect.width || localY < 0 || localY > containerRect.height) {
        return;
      }

      const targetEl = ctaRef.current;
      const targetRect = targetEl.getBoundingClientRect();
      const cx = (targetRect.left + targetRect.width / 2) - containerRect.left;
      const cy = (targetRect.top + targetRect.height / 2) - containerRect.top;

      const dist = Math.hypot(cx - localX, cy - localY);
      if (dist > 600) return; // Cut-off length boundary

      const angle = Math.atan2(cy - localY, cx - localX);
      const startRadius = 15;
      const targetRadius = targetRect.width / 2 + 10;

      const x0 = localX + Math.cos(angle) * startRadius;
      const y0 = localY + Math.sin(angle) * startRadius;
      const x1 = cx - Math.cos(angle) * targetRadius;
      const y1 = cy - Math.sin(angle) * targetRadius;

      const midX = (x0 + x1) / 2;
      const midY = (y0 + y1) / 2;
      const offset = Math.min(120, dist * 0.3);
      const controlY = midY + offset * Math.max(-1, Math.min(1, (y0 - y1) / 200));

      const opacity = Math.min(0.75, (dist - 40) / 400);
      const rgb = resolvedColorsRef.current.strokeStyle;

      ctx.save();
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(midX, controlY, x1, y1);
      ctx.setLineDash([6, 4]);
      ctx.stroke();

      // Vector head execution
      const headAngle = Math.atan2(y1 - controlY, x1 - midX);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 - 8 * Math.cos(headAngle - Math.PI / 6), y1 - 8 * Math.sin(headAngle - Math.PI / 6));
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 - 8 * Math.cos(headAngle + Math.PI / 6), y1 - 8 * Math.sin(headAngle + Math.PI / 6));
      ctx.stroke();
      ctx.restore();
    }, [ctaRef]);

    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!containerRef.current) return;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const containerRect = containerRef.current.getBoundingClientRect();

        const angle = (props.angle || 0) * (Math.PI / 180);
        const x = calculatePosition(props.x, containerRect.width, width);
        const y = calculatePosition(props.y, containerRect.height, height);

        let body;
        if (props.bodyType === "circle") {
          const radius = Math.max(width, height) / 2;
          body = Bodies.circle(x, y, radius, {
            ...props.matterBodyOptions,
            angle,
            render: { fillStyle: "transparent", strokeStyle: "transparent" },
          } as any);
        } else {
          body = Bodies.rectangle(x, y, width, height, {
            ...props.matterBodyOptions,
            angle,
            render: { fillStyle: "transparent", strokeStyle: "transparent" },
          } as any);
        }

        if (body) {
          World.add(engine.current.world, [body]);
          bodiesMap.current.set(id, { element, body, props });
        }
      },
      []
    );

    const unregisterElement = useCallback((id: string) => {
      const entry = bodiesMap.current.get(id);
      if (entry) {
        World.remove(engine.current.world, entry.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const rotation = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
      });

      if (canvasRef.current && showVectorGuide) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawInteractiveVector();
      }

      frameId.current = requestAnimationFrame(updateElements);
    }, [drawInteractiveVector, showVectorGuide]);

    const initializeRenderer = useCallback(() => {
      if (!containerRef.current || !canvasRef.current) return;

      const height = containerRef.current.offsetHeight;
      const width = containerRef.current.offsetWidth;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      if (typeof window !== "undefined") {
        Common.setDecomp(require("poly-decomp"));
      }

      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      render.current = Render.create({
        element: containerRef.current,
        engine: engine.current,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
        },
      });

      const mouse = Mouse.create(render.current.canvas);
      mouseConstraint.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: debug },
        },
      });

      const boundaries = [
        // Floor Boundary
        Bodies.rectangle(width / 2, height + 15, width, 30, { isStatic: true, friction: 0.8 }),
        // Wall Boundaries
        Bodies.rectangle(width + 15, height / 2, 30, height, { isStatic: true, friction: 0.8 }),
        Bodies.rectangle(-15, height / 2, 30, height, { isStatic: true, friction: 0.8 }),
        // Header ceiling
        Bodies.rectangle(width / 2, -15, width, 30, { isStatic: true }),
      ];

      if (grabCursor) {
        Events.on(engine.current, "beforeUpdate", () => {
          if (!containerRef.current) return;
          const hits = Query.point(engine.current.world.bodies, mouseConstraint.current?.mouse.position || { x: 0, y: 0 });
          containerRef.current.style.cursor = hits.length > 0 ? (mouseDown.current ? "grabbing" : "grab") : "default";
        });
      }

      World.add(engine.current.world, [mouseConstraint.current, ...boundaries]);
      render.current.mouse = mouse;
      runner.current = Runner.create();
      
      runner.current.enabled = true;
      Runner.run(runner.current, engine.current);
      Render.run(render.current);
      
      frameId.current = requestAnimationFrame(updateElements);
      isRunning.current = true;
    }, [updateElements, gravity.x, gravity.y, debug, grabCursor]);

    const clearRenderer = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (mouseConstraint.current) World.remove(engine.current.world, mouseConstraint.current);
      if (render.current) {
        Mouse.clearSourceEvents(render.current.mouse);
        Render.stop(render.current);
        render.current.canvas.remove();
      }
      if (runner.current) Runner.stop(runner.current);
      if (engine.current) {
        World.clear(engine.current.world, false);
        Engine.clear(engine.current);
      }
      bodiesMap.current.clear();
    }, []);

    const handleResize = useCallback(() => {
      if (!containerRef.current || !resetOnResize) return;
      setCanvasSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
      clearRenderer();
      initializeRenderer();
    }, [clearRenderer, initializeRenderer, resetOnResize]);

    useEffect(() => {
      const debouncedResize = debounce(handleResize, 400);
      window.addEventListener("resize", debouncedResize);
      const trackMouse = (e: MouseEvent) => {
        mousePosRef.current = { x: e.clientX, y: e.clientY };
      };
      window.addEventListener("mousemove", trackMouse);

      return () => {
        window.removeEventListener("resize", debouncedResize);
        window.removeEventListener("mousemove", trackMouse);
        debouncedResize.cancel();
      };
    }, [handleResize]);

    useEffect(() => {
      initializeRenderer();
      return clearRenderer;
    }, [initializeRenderer, clearRenderer]);

    useImperativeHandle(ref, () => ({
      start: () => { if (runner.current) runner.current.enabled = true; },
      stop: () => { if (runner.current) runner.current.enabled = false; },
      reset: () => {
        clearRenderer();
        initializeRenderer();
      },
    }), [clearRenderer, initializeRenderer]);

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={containerRef}
          className={cn("relative w-full overflow-hidden select-none bg-background", className)}
          {...props}
        >
          {/* Dynamic Vector Guide Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
          />
          {children}
        </div>
      </GravityContext.Provider>
    );
  }
);

InteractivePhysicsFooter.displayName = "InteractivePhysicsFooter";

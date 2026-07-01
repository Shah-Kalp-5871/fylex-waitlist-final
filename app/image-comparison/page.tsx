import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison";

export default function ImageComparisonBasic() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-8 w-full">
      <div className="max-w-4xl w-full">
        <ImageComparison className="aspect-16/9 w-full rounded-lg" enableHover>
          <ImageComparisonImage
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
            className="grayscale"
            alt="Tech device black and white"
            position="left"
          />
          <ImageComparisonImage
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
            alt="Tech device color"
            position="right"
          />
          <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs">
            <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </ImageComparisonSlider>
        </ImageComparison>
      </div>
    </main>
  );
}

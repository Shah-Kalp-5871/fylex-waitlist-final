import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/** Extract real IP from request headers */
function getIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return '127.0.0.1'; // fallback for local dev
}

/** Get live vote percentages from DB */
async function getPercentages(): Promise<{ percentages: Record<number, number>; totalVotes: number }> {
  const counts = await prisma.vote.groupBy({
    by: ['watchId'],
    _count: { watchId: true },
  });
  const totalVotes = counts.reduce((sum: number, c: any) => sum + c._count.watchId, 0);
  const percentages: Record<number, number> = {};
  for (const c of counts) {
    percentages[c.watchId] = totalVotes === 0 ? 0 : Math.round((c._count.watchId / totalVotes) * 100);
  }
  // Ensure all 6 IDs are always present
  [1, 2, 3, 4, 5, 6].forEach(id => { if (!(id in percentages)) percentages[id] = 0; });
  return { percentages, totalVotes };
}

// ─── GET /api/vote ────────────────────────────────────────────────────────────
// Called on page load. Returns whether this IP already voted + live percentages.
export async function GET(request: Request) {
  try {
    const ip = getIp(request);
    const { percentages, totalVotes } = await getPercentages();

    const existing = await prisma.vote.findUnique({ where: { ip } });

    return NextResponse.json({
      success: true,
      hasVoted: !!existing,
      watchId: existing?.watchId ?? null,
      percentages,
      totalVotes,
    });
  } catch (error) {
    console.error('Vote GET error:', error);
    // Return fallback JSON so client does not crash when DB is offline or table missing
    const defaultPercentages: Record<number, number> = { 1: 56, 2: 64, 3: 72, 4: 81, 5: 78, 6: 49 };
    return NextResponse.json({
      success: false,
      hasVoted: false,
      watchId: null,
      percentages: defaultPercentages,
      totalVotes: 0,
      error: 'Database connection failed'
    }, { status: 200 });
  }
}

// ─── POST /api/vote ───────────────────────────────────────────────────────────
// Body: { watchId: number }
// Saves the vote for this IP and returns updated percentages.
export async function POST(request: Request) {
  try {
    const ip = getIp(request);
    const body = await request.json();
    const watchId = Number(body.watchId);

    if (!watchId || ![1, 2, 3, 4, 5, 6].includes(watchId)) {
      return NextResponse.json({ success: false, error: 'Invalid watchId' }, { status: 400 });
    }

    // upsert: create if not exists, skip update if already voted (preserves first vote)
    await prisma.vote.upsert({
      where: { ip },
      update: {},            // intentionally empty — first vote wins
      create: { ip, watchId },
    });

    const { percentages, totalVotes } = await getPercentages();

    // Return the watchId that is actually stored (in case they already voted)
    const stored = await prisma.vote.findUnique({ where: { ip } });

    return NextResponse.json({
      success: true,
      watchId: stored?.watchId ?? watchId,
      percentages,
      totalVotes,
    });
  } catch (error) {
    console.error('Vote POST error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 200 });
  }
}

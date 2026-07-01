import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    try {
      await prisma.waitlist.create({
        data: { phone },
      });
    } catch (e: any) {
      // P2002 is Prisma's unique constraint violation error code
      // We can ignore it if the phone number is already registered
      if (e.code !== 'P2002') {
        throw e;
      }
    }

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/register:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

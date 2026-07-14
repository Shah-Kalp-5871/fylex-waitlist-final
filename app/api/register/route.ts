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

    const stripped = phone.replace(/\D/g, "");
    if (stripped.length !== 10) {
      return NextResponse.json(
        { error: 'Mobile number must be exactly 10 digits' },
        { status: 400 }
      );
    }
    
    if (!/^[6-9]/.test(stripped)) {
      return NextResponse.json(
        { error: 'Invalid Indian mobile number' },
        { status: 400 }
      );
    }

    try {
      await prisma.waitlist.create({
        data: { phone: stripped },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        return NextResponse.json(
          { error: 'Already registered' },
          { status: 409 }
        );
      }
      throw e;
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

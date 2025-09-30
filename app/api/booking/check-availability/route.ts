import { NextRequest, NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/googleCalendar';

export async function POST(request: NextRequest) {
  try {
    const { date, duration } = await request.json();

    if (!date || !duration) {
      return NextResponse.json(
        { error: 'Date and duration are required' },
        { status: 400 }
      );
    }

    const isAvailable = await checkAvailability(new Date(date), duration);

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
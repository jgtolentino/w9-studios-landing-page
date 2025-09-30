import { NextRequest, NextResponse } from 'next/server';
import { createBooking, BookingDetails } from '@/lib/googleCalendar';
import { sendBookingConfirmation } from '@/lib/googleGmail';

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingDetails = await request.json();

    // Validate required fields
    if (!bookingData.clientEmail || !bookingData.clientName || !bookingData.date) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Create the booking in Google Calendar
    const calendarEvent = await createBooking(bookingData);

    // Send confirmation email
    await sendBookingConfirmation(
      bookingData.clientEmail,
      bookingData.clientName,
      bookingData.company,
      {
        ...bookingData,
        eventId: calendarEvent.id,
        meetLink: calendarEvent.hangoutLink,
      }
    );

    return NextResponse.json({
      success: true,
      booking: {
        id: calendarEvent.id,
        htmlLink: calendarEvent.htmlLink,
        meetLink: calendarEvent.hangoutLink,
      },
      message: 'Booking created successfully! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        error: 'Failed to create booking',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
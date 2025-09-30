import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
);

// Set credentials if we have a refresh token
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export interface BookingDetails {
  clientEmail: string;
  clientName: string;
  company: string;
  date: Date;
  duration: number; // in minutes
  type: 'consultation' | 'studio' | 'production';
  description?: string;
  phone?: string;
}

// Check availability for a specific time slot
export async function checkAvailability(date: Date, duration: number): Promise<boolean> {
  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: date.toISOString(),
        timeMax: new Date(date.getTime() + duration * 60000).toISOString(),
        timeZone: 'Asia/Manila',
        items: [{ id: 'business@w9studio.net' }]
      }
    });

    const busySlots = response.data.calendars?.['business@w9studio.net']?.busy || [];
    return busySlots.length === 0;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw new Error('Failed to check availability');
  }
}

// Create a booking in the calendar
export async function createBooking(booking: BookingDetails) {
  try {
    const event = {
      summary: `${booking.type.charAt(0).toUpperCase() + booking.type.slice(1)} - ${booking.clientName} (${booking.company})`,
      description: `
Booking Type: ${booking.type}
Client: ${booking.clientName}
Company: ${booking.company}
Email: ${booking.clientEmail}
Phone: ${booking.phone || 'Not provided'}

${booking.description || 'No additional description provided'}
      `.trim(),
      start: {
        dateTime: booking.date.toISOString(),
        timeZone: 'Asia/Manila',
      },
      end: {
        dateTime: new Date(booking.date.getTime() + booking.duration * 60000).toISOString(),
        timeZone: 'Asia/Manila',
      },
      attendees: [
        { email: booking.clientEmail, displayName: booking.clientName },
        { email: 'business@w9studio.net', displayName: 'W9 Studios', organizer: true }
      ],
      conferenceData: booking.type === 'consultation' ? {
        createRequest: {
          requestId: `w9-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      } : undefined,
      location: booking.type === 'studio' ? 'W9 Studios, Makati CBD, Philippines' : undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 60 },      // 1 hour before
          { method: 'popup', minutes: 30 },      // 30 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'business@w9studio.net',
      requestBody: event,
      conferenceDataVersion: booking.type === 'consultation' ? 1 : 0,
      sendUpdates: 'all', // Send invitations to all attendees
    });

    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
}

// List upcoming bookings
export async function listUpcomingBookings(days: number = 30) {
  try {
    const response = await calendar.events.list({
      calendarId: 'business@w9studio.net',
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Error listing bookings:', error);
    throw new Error('Failed to list bookings');
  }
}

// Cancel a booking
export async function cancelBooking(eventId: string, reason?: string) {
  try {
    // First get the event to update description
    const event = await calendar.events.get({
      calendarId: 'business@w9studio.net',
      eventId: eventId,
    });

    if (event.data && reason) {
      // Update event with cancellation reason
      event.data.description = `CANCELLED: ${reason}\n\n${event.data.description}`;
      event.data.summary = `[CANCELLED] ${event.data.summary}`;

      await calendar.events.update({
        calendarId: 'business@w9studio.net',
        eventId: eventId,
        requestBody: event.data,
        sendUpdates: 'all',
      });
    }

    // Then delete the event
    await calendar.events.delete({
      calendarId: 'business@w9studio.net',
      eventId: eventId,
      sendUpdates: 'all',
    });

    return { success: true, message: 'Booking cancelled successfully' };
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking');
  }
}

// Get OAuth URL for initial authorization
export function getAuthUrl(): string {
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });
}

// Exchange authorization code for tokens
export async function getTokensFromCode(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw new Error('Failed to get tokens');
  }
}
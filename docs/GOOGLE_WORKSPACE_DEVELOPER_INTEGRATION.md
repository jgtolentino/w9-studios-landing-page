# Google Workspace Developer Integration Guide

## For W9 Studios (business@w9studio.net)

This guide covers developer tools and APIs available for integrating Google Workspace with your W9 Studios website.

## Overview

Google Workspace offers comprehensive APIs for programmatic integration with your business@w9studio.net account, enabling custom booking flows, automated calendar management, and seamless client communication.

## Key APIs for W9 Studios

### 1. Google Calendar API
**Purpose**: Programmatically manage appointments, availability, and bookings

**Key Features**:
- Create/update/delete calendar events
- Check availability and free/busy times
- Send meeting invitations
- Manage recurring events
- Access calendar settings

**Use Cases for W9**:
- Automated booking confirmation
- Real-time availability checking
- Custom booking interface on website
- Automated reminder emails

### 2. Gmail API
**Purpose**: Automated email communication with clients

**Key Features**:
- Send booking confirmations
- Create email templates
- Manage email signatures
- Filter and organize inquiries

**Use Cases for W9**:
- Automated booking confirmations
- Project update notifications
- Quote and invoice delivery
- Client communication tracking

### 3. Google Drive API
**Purpose**: Manage production files and client deliverables

**Key Features**:
- Upload/download files
- Create shared folders
- Manage permissions
- Track file versions

**Use Cases for W9**:
- Client file sharing
- Production asset management
- Automated backup
- Project folder creation

## Quick Start Setup

### Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com
2. Create new project: "W9-Studios-Integration"
3. Enable billing (APIs have free tier quotas)

### Step 2: Enable Required APIs

Navigate to "APIs & Services" → "Enable APIs" and enable:
- Google Calendar API
- Gmail API
- Google Drive API (optional)

### Step 3: Configure OAuth 2.0

1. Go to "APIs & Services" → "Credentials"
2. Create OAuth 2.0 Client ID
3. Application type: "Web application"
4. Authorized JavaScript origins:
   ```
   https://w9studio.net
   https://www.w9studio.net
   http://localhost:3000 (for development)
   ```
5. Authorized redirect URIs:
   ```
   https://w9studio.net/auth/callback
   https://www.w9studio.net/auth/callback
   http://localhost:3000/auth/callback
   ```

### Step 4: Set OAuth Consent Screen

1. Go to "OAuth consent screen"
2. User type: "Internal" (for w9studio.net users only)
3. App name: "W9 Studios Booking System"
4. User support email: business@w9studio.net
5. Add scopes:
   - calendar.events
   - calendar.readonly
   - gmail.send
   - drive.file (optional)

## Implementation Examples

### Calendar API Integration (Next.js)

```typescript
// /lib/googleCalendar.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials (from stored tokens)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Check availability
export async function checkAvailability(date: Date, duration: number) {
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: date.toISOString(),
      timeMax: new Date(date.getTime() + duration * 60000).toISOString(),
      items: [{ id: 'business@w9studio.net' }]
    }
  });

  return response.data.calendars['business@w9studio.net'].busy.length === 0;
}

// Create booking
export async function createBooking(
  clientEmail: string,
  clientName: string,
  date: Date,
  duration: number,
  type: 'consultation' | 'studio' | 'production'
) {
  const event = {
    summary: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${clientName}`,
    description: `Booking type: ${type}\nClient: ${clientName}`,
    start: {
      dateTime: date.toISOString(),
      timeZone: 'Asia/Manila',
    },
    end: {
      dateTime: new Date(date.getTime() + duration * 60000).toISOString(),
      timeZone: 'Asia/Manila',
    },
    attendees: [
      { email: clientEmail },
      { email: 'business@w9studio.net' }
    ],
    conferenceData: {
      createRequest: {
        requestId: `w9-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'business@w9studio.net',
    requestBody: event,
    conferenceDataVersion: 1,
  });

  return response.data;
}
```

### Gmail API Integration

```typescript
// /lib/googleGmail.ts
import { google } from 'googleapis';

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export async function sendBookingConfirmation(
  clientEmail: string,
  clientName: string,
  bookingDetails: any
) {
  const message = [
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `To: ${clientEmail}`,
    'From: W9 Studios <business@w9studio.net>',
    `Subject: Booking Confirmation - ${bookingDetails.type}`,
    '',
    `<h2>Booking Confirmed!</h2>`,
    `<p>Dear ${clientName},</p>`,
    `<p>Your ${bookingDetails.type} has been confirmed for:</p>`,
    `<p><strong>Date:</strong> ${bookingDetails.date}</p>`,
    `<p><strong>Time:</strong> ${bookingDetails.time}</p>`,
    `<p><strong>Duration:</strong> ${bookingDetails.duration} minutes</p>`,
    `<p><strong>Location:</strong> ${bookingDetails.location}</p>`,
    `<p>We look forward to seeing you!</p>`,
    `<p>Best regards,<br>W9 Studios Team</p>`
  ].join('\n');

  const encodedMessage = Buffer.from(message).toString('base64');

  const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });

  return response.data;
}
```

## API Quotas & Limits

### Free Tier Quotas (Daily)
- **Calendar API**: 1,000,000 requests
- **Gmail API**: 250 quota units (sending ~250 emails)
- **Drive API**: 1,000,000,000 requests

These quotas are more than sufficient for W9 Studios' needs.

## Security Best Practices

1. **Never expose API keys in client-side code**
   - Use environment variables
   - Implement server-side API routes

2. **Use service accounts for server-to-server auth**
   ```bash
   # Create service account in Google Cloud Console
   # Download JSON key file
   # Store securely on server
   ```

3. **Implement rate limiting**
   ```typescript
   // Prevent API quota exhaustion
   import rateLimit from 'express-rate-limit';

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests
   });
   ```

4. **Use OAuth 2.0 for user authentication**
   - Never store user passwords
   - Use refresh tokens for long-term access

## Testing Tools

### Google API Explorer
Test APIs directly in browser: https://developers.google.com/workspace/explore

### OAuth 2.0 Playground
Test authentication flow: https://developers.google.com/oauthplayground/

### Postman Collections
Google provides Postman collections for testing:
- Calendar API: Available in API documentation
- Gmail API: Available in API documentation

## Advanced Features

### 1. Webhook Notifications
Get real-time updates when calendar changes:
```typescript
// Subscribe to calendar changes
await calendar.events.watch({
  calendarId: 'business@w9studio.net',
  requestBody: {
    id: 'unique-channel-id',
    type: 'web_hook',
    address: 'https://w9studio.net/api/calendar-webhook'
  }
});
```

### 2. Batch Requests
Combine multiple API calls:
```typescript
const batch = google.newBatchHttpRequest();
batch.add(calendar.events.list(...));
batch.add(calendar.events.insert(...));
batch.execute();
```

### 3. Google Apps Script
Automate without servers:
```javascript
// Code.gs in Google Apps Script
function onFormSubmit(e) {
  // Automatically create calendar event from form submission
  CalendarApp.createEvent(
    e.values[1], // title
    new Date(e.values[2]), // start
    new Date(e.values[3])  // end
  );
}
```

## Integration with W9 Studios Website

### Update BookingSystem.tsx

Replace placeholder links with API calls:

```typescript
// /components/BookingSystem.tsx
import { checkAvailability, createBooking } from '@/lib/googleCalendar';
import { sendBookingConfirmation } from '@/lib/googleGmail';

// Instead of static link:
// const googleCalendarLink = 'placeholder'

// Use API integration:
const handleBookingSubmit = async (formData: BookingFormData) => {
  try {
    // Check availability
    const isAvailable = await checkAvailability(
      formData.date,
      formData.duration
    );

    if (isAvailable) {
      // Create booking
      const booking = await createBooking(
        formData.email,
        formData.name,
        formData.date,
        formData.duration,
        formData.type
      );

      // Send confirmation
      await sendBookingConfirmation(
        formData.email,
        formData.name,
        booking
      );

      return { success: true, booking };
    }
  } catch (error) {
    console.error('Booking error:', error);
    return { success: false, error };
  }
};
```

## Support & Resources

### Documentation
- Main portal: https://developers.google.com/workspace
- Calendar API: https://developers.google.com/calendar
- Gmail API: https://developers.google.com/gmail
- JavaScript client library: https://github.com/googleapis/google-api-nodejs-client

### Support Channels
- Stack Overflow: Tag `google-workspace-api`
- Issue tracker: https://issuetracker.google.com/issues
- Developer forum: https://groups.google.com/g/google-workspace-developer-community

### Rate Limits & Monitoring
- Monitor usage: https://console.cloud.google.com/apis/dashboard
- Set up alerts for quota usage
- Use exponential backoff for retries

## Next Steps for W9 Studios

1. **Immediate** (Can implement now):
   - Create Google Cloud Project
   - Enable Calendar API
   - Set up OAuth 2.0 credentials

2. **Short-term** (This week):
   - Implement availability checking
   - Create booking confirmation emails
   - Test with business@w9studio.net account

3. **Long-term** (This month):
   - Add webhook notifications
   - Implement recurring bookings
   - Create admin dashboard for managing bookings

---

**Note**: The free tier quotas are more than sufficient for W9 Studios. You won't need to pay for API usage unless you're processing thousands of bookings per day.
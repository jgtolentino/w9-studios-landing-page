# Google Calendar Appointment Scheduling Setup Guide

## For W9 Studios (business@w9studio.net)

### Step 1: Access Google Calendar
1. Go to https://calendar.google.com
2. Sign in with **business@w9studio.net**

### Step 2: Create Appointment Schedule

#### Method A: From Calendar Settings
1. Click the **gear icon** (⚙️) in the top right
2. Select **Settings**
3. In the left sidebar, find **Appointment schedules**
4. Click **Create** or **+ New appointment schedule**

#### Method B: Direct Link
1. Go directly to: https://calendar.google.com/calendar/appointments

### Step 3: Configure Your Appointment Types

#### For Initial Consultation (30-min Video Call)
1. **Title**: "Initial Project Consultation"
2. **Duration**: 30 minutes
3. **Location**: Google Meet (automatic video link)
4. **Description**:
   ```
   Let's discuss your project requirements, timeline, and budget.
   We'll explore how W9 Studios can bring your vision to life.
   ```
5. **Availability**:
   - Monday-Friday: 9:00 AM - 6:00 PM
   - Saturday: 10:00 AM - 4:00 PM
   - Buffer time: 15 minutes between appointments
6. **Booking window**:
   - Minimum notice: 4 hours
   - Maximum advance booking: 60 days

#### For Studio Tour/Site Visit
1. **Title**: "Studio Tour & Site Visit"
2. **Duration**: 45 minutes
3. **Location**: W9 Studios, Makati CBD
4. **Availability**:
   - Tuesday & Thursday: 2:00 PM - 5:00 PM
   - Saturday: 10:00 AM - 2:00 PM

#### For Production Planning Meeting
1. **Title**: "Production Planning Session"
2. **Duration**: 60 minutes
3. **Location**: Google Meet or In-person
4. **Availability**: By request only

### Step 4: Customize Booking Page

1. **Booking form questions** (recommended):
   - Company/Agency name (Required)
   - Project type (TV Commercial, Corporate Video, Digital Content)
   - Estimated budget range
   - Preferred production timeline
   - Brief project description

2. **Confirmation settings**:
   - ✅ Send email confirmation to booker
   - ✅ Add to booker's calendar
   - ✅ Send reminder 1 day before
   - ✅ Send reminder 1 hour before

3. **Branding** (if available):
   - Add W9 Studios logo
   - Use brand colors: #0066FF (blue), #E84141 (red)
   - Custom confirmation message

### Step 5: Get Your Booking Link

1. After creating the appointment schedule, click **Share**
2. Copy the **booking page link**
3. It will look like:
   ```
   https://calendar.app.google/[unique-id]
   ```
   or
   ```
   https://calendar.google.com/calendar/appointments/schedules/[unique-id]
   ```

### Step 6: Update Website

Replace the placeholder in `BookingSystem.tsx`:
```typescript
// Line 10 - Replace with your actual link
const googleCalendarLink = 'https://calendar.app.google/YOUR-UNIQUE-ID-HERE'
```

### Step 7: Test the Integration

1. Open the booking link in incognito/private browser
2. Try booking a test appointment
3. Verify you receive:
   - Email notification to business@w9studio.net
   - Calendar event created
   - Confirmation email sent to test booker

## Alternative: Google Forms + Calendar Integration

If appointment scheduling isn't available or you need more control:

### Create Google Form for Bookings
1. Go to https://forms.google.com
2. Create new form: "W9 Studios Booking Request"
3. Add fields:
   - Name (Short answer, Required)
   - Email (Short answer, Required)
   - Company/Agency (Short answer, Required)
   - Phone (Short answer)
   - Service Type (Multiple choice):
     * Initial Consultation
     * Studio Rental
     * Equipment Rental
     * Full Production
   - Preferred Date (Date picker)
   - Preferred Time Slots (Checkboxes):
     * 9:00 AM - 12:00 PM
     * 12:00 PM - 3:00 PM
     * 3:00 PM - 6:00 PM
   - Budget Range (Multiple choice)
   - Project Description (Paragraph)

### Set Up Form Notifications
1. In Form, click **three dots menu** → **Script editor**
2. Or use **Form settings** → **Responses** → **Get email notifications**

### Connect to Google Sheets
1. In Form, go to **Responses** tab
2. Click **Google Sheets icon**
3. Create new spreadsheet: "W9 Studios Bookings"
4. This creates automatic logging of all submissions

### Create Calendar Events from Form
Use Google Apps Script or Zapier to automatically:
- Create calendar events from form submissions
- Send confirmation emails
- Block time slots

## Manual Booking Management

For immediate use while setting up automation:

1. **Share your Google Calendar availability**:
   ```
   https://calendar.google.com/calendar/u/0/embed?src=business@w9studio.net
   ```

2. **Use Calendly Alternative** (if you have it):
   - Connect to business@w9studio.net Google Calendar
   - Create event types
   - Get shareable link

3. **Simple Email Booking**:
   - Direct clients to email business@w9studio.net
   - Manually create calendar events
   - Send calendar invites

## Troubleshooting

### "Appointment schedules" not showing:
- Feature might not be enabled for Business Starter
- Try using Google Workspace Admin to enable it
- Contact Google Workspace support

### Can't create appointment slots:
- Check calendar permissions
- Ensure you're logged in as business@w9studio.net
- Clear browser cache and cookies

### Integration not working:
- Verify domain ownership in Google Workspace
- Check that calendar is set to correct timezone (Manila, GMT+8)
- Ensure calendar isn't set to private

## Quick Links

- Google Calendar: https://calendar.google.com
- Google Forms: https://forms.google.com
- Google Workspace Admin: https://admin.google.com
- Help Center: https://support.google.com/calendar/answer/10729749

## Support

For Google Workspace Business support:
- Chat support available in admin console
- Email: workspace-support@google.com
- Phone: Available for Business plans

---

Last updated: October 2024
For W9 Studios - business@w9studio.net
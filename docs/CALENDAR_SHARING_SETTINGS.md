# Google Workspace Calendar Sharing Settings Configuration

## Access Admin Console Calendar Settings

1. **Go to**: https://admin.google.com
2. **Navigate to**: Apps → Google Workspace → Calendar
3. **Look for**: "Sharing settings" section

## Key Settings to Configure

### 1. External Sharing Options
**Recommended for W9 Studios:**
- ✅ **"Only free/busy information (hide event details)"** - For privacy
- OR
- ✅ **"Share all information, but outsiders cannot change calendars"** - For transparency with clients

### 2. External Invitations
- ✅ **Allow users to receive external invitations** - YES (clients can send you invites)
- ✅ **Warn users about external invitations** - Optional (adds security warning)

### 3. Video Conferencing
- ✅ **Google Meet** - Enable for all events
- ✅ **Automatically add video conferencing to events** - Recommended

### 4. Appointment Schedules (IMPORTANT!)
Look for this setting - it might be:
- Under "Additional Google Calendar settings"
- Listed as "Appointment slots" or "Bookable appointments"
- May need to be enabled separately

**If you see "Appointment schedules":**
- ✅ Enable for all users
- ✅ Allow external users to book appointments
- ✅ Allow customization of booking pages

### 5. Calendar Interop
- ✅ **Enable Calendar Interop** - Allows Exchange/Outlook users to see availability

## Individual Calendar Settings
(Do this from business@w9studio.net account)

### From Google Calendar (calendar.google.com):

1. **Click gear icon ⚙️ → Settings**

2. **Under "Settings for my calendars":**
   - Select your primary calendar
   - Go to "Access permissions for events"

3. **Configure these settings:**
   - ✅ **Make available to public** → "See only free/busy (hide details)"
   - This allows clients to see when you're available without seeing meeting details

4. **Share with specific people:**
   - Add team members with "Make changes" permission
   - Add key clients with "See all event details" permission

## Creating Bookable Appointment Schedules

### Option A: If "Appointment schedules" is available

1. In Calendar, look for:
   - **"Create" button → "Appointment schedule"**
   - OR **Settings → Appointment schedules**

2. If not visible, try:
   - Direct URL: https://calendar.google.com/calendar/appointments
   - May need to enable in Admin Console first

### Option B: Alternative Booking Methods

**1. Use Google Forms + Calendar:**
```
Create Form → Collect booking requests → Manually add to calendar
```

**2. Use Free Calendly:**
```
Sign up with business@w9studio.net → Connect Google Calendar → Get booking link
```

**3. Use Cal.com (Open Source):**
```
Free tier available → Connect Google Calendar → Custom booking page
```

## Troubleshooting

### "Appointment schedules" not showing:

**Check 1: Admin Console**
- Apps → Google Workspace → Calendar
- Look for "Additional services" or "Labs"
- May be listed as "Beta features"

**Check 2: Edition Limitations**
- Business Starter may have limitations
- Contact Google Support to confirm availability

**Check 3: User Settings**
- Sign out and back in
- Clear browser cache
- Try incognito mode

### Can't share calendar externally:

1. **Admin Console**:
   - Check "External sharing" is enabled
   - Verify domain isn't restricted

2. **Calendar Settings**:
   - Ensure calendar isn't set to "Private"
   - Check organization policies

## Quick Setup for W9 Studios

### Immediate Solution (Works Today):

1. **Set calendar to "Free/Busy" public sharing**:
   - Clients can see availability
   - Privacy maintained

2. **Create a Google Form for bookings**:
   ```
   Title: W9 Studios Production Booking
   Fields:
   - Name*
   - Email*
   - Company*
   - Preferred Date*
   - Time Preference (Morning/Afternoon/Evening)
   - Service Type (Consultation/Studio/Production)
   - Budget Range
   - Project Description
   ```

3. **Form Settings**:
   - Responses → Get email notifications
   - Send to business@w9studio.net

4. **Share the form link**:
   ```
   https://forms.gle/[your-form-id]
   ```

### Professional Solution (Recommended):

1. **Sign up for Calendly Free**:
   - Use business@w9studio.net
   - Connect Google Calendar
   - Create event types:
     * 30-min consultation
     * 60-min production planning
     * Studio tour

2. **Get Calendly link**:
   ```
   https://calendly.com/w9studios
   ```

3. **Embed on website**:
   - Use Calendly embed widget
   - Or simple link button

## Contact Google Support

If you need help enabling appointment schedules:

1. **From Admin Console**:
   - Click "?" icon → Contact support
   - Business Starter includes support

2. **Ask specifically**:
   "How do I enable appointment scheduling feature for Google Calendar in Business Starter plan?"

3. **Alternative phrasing**:
   - "Bookable calendar"
   - "Appointment slots"
   - "Calendar booking page"

---

**Note**: Google Workspace features vary by plan and region. Business Starter may have limited appointment scheduling features compared to Business Standard/Plus.
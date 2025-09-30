# Google Cloud Setup Instructions for W9 Studios

## Quick Setup Guide (10 minutes)

Follow these steps to enable Google Calendar API integration for your booking system.

### ✅ Step 1: Create Google Cloud Project

1. **Go to**: https://console.cloud.google.com
2. **Sign in** with `business@w9studio.net`
3. **Click** "Select a Project" (top left) → "NEW PROJECT"
4. **Enter**:
   - Project name: `W9-Studios-Integration`
   - Leave organization as default
5. **Click** "CREATE"
6. **Wait** ~30 seconds for creation

### ✅ Step 2: Enable Required APIs

1. **In your new project**, go to "APIs & Services" → "Library"
2. **Search and enable** these APIs:

   **Google Calendar API**:
   - Search "Google Calendar API"
   - Click on it
   - Click "ENABLE"

   **Gmail API** (optional, for email confirmations):
   - Search "Gmail API"
   - Click on it
   - Click "ENABLE"

### ✅ Step 3: Create OAuth 2.0 Credentials

1. **Go to** "APIs & Services" → "Credentials"
2. **Click** "+ CREATE CREDENTIALS" → "OAuth client ID"
3. **If prompted** to configure consent screen:
   - Click "CONFIGURE CONSENT SCREEN"
   - User Type: **Internal** (for w9studio.net users only)
   - Click "CREATE"

### ✅ Step 4: Configure OAuth Consent Screen

Fill in these required fields:

1. **App information**:
   - App name: `W9 Studios Booking System`
   - User support email: `business@w9studio.net`
   - Developer contact: `business@w9studio.net`

2. **Scopes** (click "ADD OR REMOVE SCOPES"):
   - ✅ `.../auth/calendar` (See, edit, share calendars)
   - ✅ `.../auth/calendar.events` (View and edit events)
   - ✅ `.../auth/gmail.send` (Send email on your behalf)

3. **Click** "SAVE AND CONTINUE"

### ✅ Step 5: Create OAuth Client ID

1. **Return to** "Credentials" → "+ CREATE CREDENTIALS" → "OAuth client ID"
2. **Application type**: Web application
3. **Name**: `W9 Studios Website`
4. **Authorized JavaScript origins** (click "+ ADD URI"):
   ```
   http://localhost:3000
   https://jgtolentino.github.io
   https://w9studio.net
   https://www.w9studio.net
   ```

5. **Authorized redirect URIs** (click "+ ADD URI"):
   ```
   http://localhost:3000/api/auth/google/callback
   https://jgtolentino.github.io/w9-studios-landing-page/api/auth/google/callback
   https://w9studio.net/api/auth/google/callback
   https://www.w9studio.net/api/auth/google/callback
   ```

6. **Click** "CREATE"

### ✅ Step 6: Save Your Credentials

After creating, you'll see a popup with your credentials:

1. **Copy** these values:
   - Client ID: `[long-string].apps.googleusercontent.com`
   - Client Secret: `GOCSPX-[random-string]`

2. **Create** `.env.local` file in your project root:
   ```bash
   cd /Users/tbwa/Documents/W9/w9-studios-landing-page
   cp .env.local.example .env.local
   ```

3. **Edit** `.env.local` and paste your credentials:
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
   NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
   ```

### ✅ Step 7: Authorize and Get Refresh Token

1. **Restart** your development server:
   ```bash
   npm run dev
   ```

2. **Open** http://localhost:3000/admin/setup

3. **Click** "Connect Google Calendar"

4. **Sign in** with `business@w9studio.net`

5. **Grant** permissions when prompted

6. **Check browser console** (F12 → Console tab) for the refresh token

7. **Add refresh token** to `.env.local`:
   ```env
   GOOGLE_REFRESH_TOKEN=1//[your-refresh-token-here]
   ```

8. **Restart** server again to load the refresh token

### ✅ Step 8: Test the Integration

1. **Go to** your website's booking page
2. **Fill out** the booking form
3. **Submit** - it should now create a real calendar event!
4. **Check** business@w9studio.net calendar for the new event

## Troubleshooting

### "Access blocked" error
- Make sure you selected "Internal" for user type
- Verify you're signed in with business@w9studio.net

### "Redirect URI mismatch" error
- Double-check all redirect URIs match exactly
- Include both http://localhost:3000 and your production URL

### "Insufficient permissions" error
- Make sure you granted all requested calendar permissions
- Re-run the OAuth flow at /admin/setup

### API not working
- Check that APIs are enabled in Google Cloud Console
- Verify .env.local has all required values
- Check browser console for specific error messages

## Production Deployment

Before deploying to production:

1. **Add production URLs** to OAuth client:
   - JavaScript origins: Your production domain
   - Redirect URIs: Your production domain + `/api/auth/google/callback`

2. **Set environment variables** in your hosting platform:
   - Vercel: Settings → Environment Variables
   - Add all values from .env.local

3. **Test thoroughly** on production domain

## Security Notes

- **Never commit** `.env.local` to Git
- **Keep** `GOOGLE_CLIENT_SECRET` and `GOOGLE_REFRESH_TOKEN` secure
- **Use** "Internal" app type for better security
- **Regularly review** API usage in Google Cloud Console

## Support

Need help? Contact options:
- Google Workspace Support (included with Business Starter)
- Google Cloud Console → "?" → Contact support
- Stack Overflow: Tag `google-calendar-api`

---

**Estimated setup time**: 10-15 minutes
**Difficulty**: Easy (just clicking and copying values)
**Cost**: FREE (API quotas are very generous)
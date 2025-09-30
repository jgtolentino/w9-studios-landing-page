# Final OAuth Setup Steps for W9 Studios

## ✅ What's Done
- Client ID: Saved and configured ✅
- Client Secret: Saved and configured ✅
- API Key: Saved for future use ✅
- Environment file: Created ✅

## ⚠️ Important: OAuth Type Issue

Your current OAuth client is configured as **"Installed Application"** (desktop/mobile).
For the website, you need **"Web Application"** type.

## 🔧 Quick Fix (5 minutes)

### Option A: Create New Web OAuth Client (Recommended)

1. **Go to Google Cloud Console**:
   https://console.cloud.google.com/apis/credentials?project=w9-studios-integration

2. **Create NEW OAuth client**:
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application** (NOT Desktop)
   - Name: "W9 Studios Website"

3. **Add Authorized JavaScript Origins**:
   ```
   http://localhost:3001
   https://jgtolentino.github.io
   ```

4. **Add Authorized Redirect URIs**:
   ```
   http://localhost:3001/api/auth/google/callback
   https://jgtolentino.github.io/w9-studios-landing-page/api/auth/google/callback
   ```

5. **Download new credentials** and replace in `.env.local`

### Option B: Use Current Desktop OAuth (Workaround)

Since you have "installed" type, we can modify our code to work with it:

1. The redirect URI is limited to `http://localhost`
2. This will only work locally, not on production
3. Good for testing, but you'll need Web OAuth for production

## 🚀 Next Step: Get Refresh Token

After fixing OAuth type:

1. **Restart your dev server**:
   ```bash
   # Kill current server (Ctrl+C)
   npm run dev
   ```

2. **Open setup page**:
   http://localhost:3001/admin/setup

3. **Click "Connect Google Calendar"**

4. **Authorize with business@w9studio.net**

5. **Check browser console** for refresh token

6. **Add to `.env.local`**:
   ```
   GOOGLE_REFRESH_TOKEN=1//[your-token-here]
   ```

## 📝 Current Credentials Status

```
Project: w9-studios-integration ✅
Client ID: 916601...apps.googleusercontent.com ✅
Client Secret: GOCSPX-0BNJY... ✅
API Key: AIzaSyD... ✅
OAuth Type: Desktop ⚠️ (needs Web type)
Refresh Token: Pending ⏳
```

## 🎯 To Make Booking Work

You need to either:
1. Create new Web OAuth client (for production) - **Recommended**
2. OR modify the redirect URI in Google Cloud Console to include `/api/auth/google/callback`

The booking system will work once you:
1. Have Web OAuth client
2. Get the refresh token
3. Add it to `.env.local`

---

**Need help?** The system has fallback to manual booking, so your site works regardless!
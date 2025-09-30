# Fix Redirect URI Mismatch

## The Problem
Error 400: redirect_uri_mismatch
The app name shows as "booking" instead of "W9 Studios"

## Solution: Check Google Cloud Console

### 1. Go to Google Cloud Console
https://console.cloud.google.com/apis/credentials?project=w9-studios-integration

### 2. Find your OAuth 2.0 Client
Look for: "916601142061-acqbgukfia2v24deu3hhcag8au9gjs93"

### 3. Check EXACT Redirect URIs
Make sure these EXACT URIs are added (no trailing slashes!):

```
http://localhost
http://localhost/
http://localhost:3000
http://localhost:3000/
http://localhost:3000/api/auth/google/callback
http://localhost:3000/w9-studios-landing-page/api/auth/google/callback
https://jgtolentino.github.io/w9-studios-landing-page/api/auth/google/callback
```

### 4. Also Check JavaScript Origins
```
http://localhost
http://localhost:3000
https://jgtolentino.github.io
```

## Quick Test with Different URIs

### Test 1: Simplest (http://localhost)
```bash
open "https://accounts.google.com/o/oauth2/auth?client_id=916601142061-acqbgukfia2v24deu3hhcag8au9gjs93.apps.googleusercontent.com&redirect_uri=http://localhost&scope=https://www.googleapis.com/auth/calendar&response_type=code&access_type=offline&prompt=consent"
```

### Test 2: With trailing slash
```bash
open "https://accounts.google.com/o/oauth2/auth?client_id=916601142061-acqbgukfia2v24deu3hhcag8au9gjs93.apps.googleusercontent.com&redirect_uri=http://localhost/&scope=https://www.googleapis.com/auth/calendar&response_type=code&access_type=offline&prompt=consent"
```

### Test 3: Port 3000
```bash
open "https://accounts.google.com/o/oauth2/auth?client_id=916601142061-acqbgukfia2v24deu3hhcag8au9gjs93.apps.googleusercontent.com&redirect_uri=http://localhost:3000&scope=https://www.googleapis.com/auth/calendar&response_type=code&access_type=offline&prompt=consent"
```

## The App Name Issue

If the app shows as "booking" instead of "W9 Studios":

1. Go to: APIs & Services → OAuth consent screen
2. Click "EDIT APP"
3. Change App name to: "W9 Studios Booking System"
4. Save changes

## Alternative: Use the Desktop OAuth Client

Since you also have a desktop OAuth client (the first JSON file), we can use that:

Client ID: 916601142061-iidvoghuvf04cudv817oecq95vldab2b
This one only accepts: http://localhost

Try with desktop client:
```bash
open "https://accounts.google.com/o/oauth2/auth?client_id=916601142061-iidvoghuvf04cudv817oecq95vldab2b.apps.googleusercontent.com&redirect_uri=http://localhost&scope=https://www.googleapis.com/auth/calendar&response_type=code&access_type=offline&prompt=consent"
```
# Bypass Organization Policy Issue - W9 Studios

## The Problem
Your Google Workspace has an organization policy blocking service account key creation:
- Policy: `iam.disableServiceAccountKeyCreation`
- Tracking: c7271791236903207

## The Solution: Use OAuth 2.0 Instead! ✅

**Good news**: You don't need service account keys! OAuth 2.0 is actually better and more secure.

## Quick Fix Steps (10 minutes)

### Option 1: OAuth 2.0 (Recommended) ✅

This is what we already built for you! It bypasses the organization policy entirely.

1. **In Google Cloud Console**:
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS"
   - Choose **"OAuth client ID"** (NOT service account)
   - This works even with the policy enabled!

2. **Configure OAuth**:
   - Application type: Web application
   - Name: W9 Studios Website
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/google/callback
     https://jgtolentino.github.io/w9-studios-landing-page/api/auth/google/callback
     ```

3. **Get your credentials**:
   - Copy Client ID
   - Copy Client Secret
   - Add to `.env.local`

4. **Authorize once**:
   - Go to http://localhost:3000/admin/setup
   - Click "Connect Google Calendar"
   - Sign in with business@w9studio.net
   - Get refresh token from console
   - Add to `.env.local`

### Option 2: Personal Google Account (Alternative)

If the organization policy is too restrictive:

1. **Create a personal Google account** (free)
   - Example: w9studios.booking@gmail.com
2. **Share your business calendar** with this account
3. **Use this account for API integration**
4. **Forward emails** to business@w9studio.net

### Option 3: Request Policy Change

If you must use service accounts:

1. **Contact your Google Workspace admin**
2. **Reference tracking**: c7271791236903207
3. **Request to disable**: iam.disableServiceAccountKeyCreation
4. **For project**: W9-Studios-Integration only

## Why This Policy Exists

Google enabled "Secure by Default" for organizations to prevent:
- Leaked service account keys
- Unauthorized access
- Security breaches

OAuth 2.0 is safer because:
- No permanent keys to leak
- User consent required
- Tokens expire automatically
- Can be revoked anytime

## Recommended Approach

**Use OAuth 2.0** - It's:
- ✅ Already implemented in your code
- ✅ More secure than service accounts
- ✅ Works with the organization policy
- ✅ What Google recommends

## Commands to Check Status

```bash
# Install gcloud CLI if needed
brew install google-cloud-sdk

# Login
gcloud auth login business@w9studio.net

# Check organization
gcloud organizations list

# Check policy (if you have permission)
gcloud resource-manager org-policies describe \
    iam.disableServiceAccountKeyCreation \
    --organization=YOUR_ORG_ID
```

## The Bottom Line

**You don't need to fix the organization policy!**

Just use OAuth 2.0 (which we already built) instead of service account keys. It's more secure and works with your current Google Workspace settings.

---

**Quick Start**: Follow `/docs/GOOGLE_CLOUD_SETUP_INSTRUCTIONS.md` but choose OAuth 2.0, not service account.
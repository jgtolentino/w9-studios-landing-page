# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- Vercel account
- Wix Headless Client ID

### Setup

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Link Project**
```bash
cd ~/Documents/W9/wix-nextjs-migration
vercel link
```

4. **Add Environment Variables**
```bash
# Add to Vercel project
vercel env add NEXT_PUBLIC_WIX_CLIENT_ID
# Paste your Wix Client ID when prompted

# Or use Vercel dashboard:
# https://vercel.com/[your-team]/[your-project]/settings/environment-variables
```

5. **Deploy**
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Automatic Deployments
- **Production**: Triggered on push to `main` branch
- **Preview**: Created for every PR
- **Configuration**: See `.github/workflows/vercel.yml`

### Custom Domain
1. Go to Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate provisioned automatically

---

## Netlify Deployment

### Prerequisites
- Netlify account
- Netlify CLI installed

### Setup

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Initialize Site**
```bash
netlify init
```

4. **Configure Environment**
```bash
netlify env:set NEXT_PUBLIC_WIX_CLIENT_ID your-client-id-here
```

5. **Deploy**
```bash
# Build and deploy
netlify deploy --prod --build
```

### Configuration
The project includes `netlify.toml` with optimized settings.

---

## Azure Static Web Apps

### Prerequisites
- Azure account and subscription
- Azure CLI installed
- GitHub repository

### Setup

1. **Login to Azure**
```bash
az login
```

2. **Create Resource Group**
```bash
az group create \
  --name wix-nextjs-rg \
  --location eastus
```

3. **Create Static Web App**
```bash
az staticwebapp create \
  --name wix-nextjs-app \
  --resource-group wix-nextjs-rg \
  --source https://github.com/[your-username]/[your-repo] \
  --branch main \
  --app-location "/" \
  --output-location ".next" \
  --login-with-github
```

4. **Configure Environment Variables**
```bash
# Via Azure Portal:
# Resource → Configuration → Application settings
# Add: NEXT_PUBLIC_WIX_CLIENT_ID = your-client-id
```

5. **Deploy via GitHub Actions**
- GitHub Actions workflow automatically created
- Deploys on push to `main`
- See `.github/workflows/azure-static-web-apps.yml`

### Custom Domain
```bash
az staticwebapp hostname set \
  --name wix-nextjs-app \
  --resource-group wix-nextjs-rg \
  --hostname www.yourdomain.com
```

---

## Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
ARG NEXT_PUBLIC_WIX_CLIENT_ID
ENV NEXT_PUBLIC_WIX_CLIENT_ID=$NEXT_PUBLIC_WIX_CLIENT_ID
RUN yarn build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Build & Run
```bash
# Build image
docker build \
  --build-arg NEXT_PUBLIC_WIX_CLIENT_ID=your-client-id \
  -t wix-nextjs-app .

# Run container
docker run -p 3000:3000 wix-nextjs-app
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      args:
        NEXT_PUBLIC_WIX_CLIENT_ID: ${NEXT_PUBLIC_WIX_CLIENT_ID}
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

## Environment Variables

### Required
- `NEXT_PUBLIC_WIX_CLIENT_ID` - Wix Headless OAuth Client ID

### Optional
- `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `REVALIDATE_SECRET` - ISR revalidation secret

### Security Notes
- Never commit `.env.local` to git
- Use platform-specific secret management
- Rotate credentials regularly
- Use different credentials for staging/production

---

## CI/CD Pipeline

### GitHub Actions Workflow
Located at `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop`
- Pull requests

**Jobs:**
1. **Quality**: Lint, type check, unit tests
2. **E2E**: Playwright integration tests
3. **Performance**: Lighthouse CI
4. **Deploy**: Automatic deployment on `main`

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Lighthouse scores >90
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Custom domain DNS updated (if applicable)

---

## Post-Deployment

### Monitoring
1. **Error Tracking**: Set up Sentry or similar
2. **Analytics**: Configure Google Analytics
3. **Uptime**: Set up StatusCake or Pingdom
4. **Performance**: Monitor Core Web Vitals

### Optimization
1. Enable CDN for static assets
2. Configure caching headers
3. Implement ISR for dynamic content
4. Set up image optimization

### Rollback Procedure
**Vercel:**
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

**Azure:**
```bash
# Via Portal: Deployments → Select previous version → Activate
```

**Docker:**
```bash
# Tag stable version
docker tag wix-nextjs-app:latest wix-nextjs-app:stable

# Rollback
docker stop current-container
docker run -p 3000:3000 wix-nextjs-app:stable
```

---

## Support

For deployment issues:
- Check deployment logs
- Review environment variables
- Verify DNS configuration
- Test build locally first

Platform-specific support:
- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support
- Azure: https://docs.microsoft.com/azure/static-web-apps

# Wix → Next.js Migration Guide

## Overview

This guide provides a systematic approach to migrating your existing Wix site to this Next.js Headless setup.

## Migration Strategy

### Option 1: Keep Wix as Headless CMS
**Recommended for content-heavy sites**

- ✅ Keep using Wix Content Manager for content editing
- ✅ Migrate rendering layer to Next.js
- ✅ Maintain familiar content editing workflow
- ✅ Progressive migration path

### Option 2: Full Migration Away from Wix
**For complete independence**

- Export all content from Wix
- Migrate to alternative CMS (Contentful, Sanity, etc.)
- One-time migration effort
- More control over content structure

## Pre-Migration Checklist

### 1. Content Audit
- [ ] Catalog all pages and their URLs
- [ ] List all dynamic content sections
- [ ] Document custom functionality
- [ ] Identify third-party integrations
- [ ] Map content types and relationships

### 2. Asset Inventory
- [ ] Images (locations, sizes, formats)
- [ ] Videos and media files
- [ ] Downloadable files (PDFs, docs)
- [ ] Fonts and custom typography
- [ ] Icons and graphics

### 3. Technical Assessment
- [ ] Review current SEO setup (meta tags, structured data)
- [ ] Document tracking/analytics integrations
- [ ] List all forms and their submission handlers
- [ ] Identify API dependencies
- [ ] Review custom code/scripts

## Migration Process

### Phase 1: Setup & Configuration

#### 1.1 Environment Setup
```bash
# Install dependencies
yarn install

# Copy environment template
cp .env.template .env.local

# Configure Wix Headless credentials
# Edit .env.local with your NEXT_PUBLIC_WIX_CLIENT_ID
```

#### 1.2 Wix Headless Project Setup
1. Go to [Wix Headless](https://www.wix.com/headless)
2. Create a new Headless project
3. Add **Content Manager** app to your project
4. Copy the OAuth Client ID
5. Paste into `.env.local` as `NEXT_PUBLIC_WIX_CLIENT_ID`

### Phase 2: Content Migration

#### 2.1 Export Content from Current Wix Site
```bash
# Run the content crawler
node scripts/crawl-wix-site.js --url https://your-site.wix.com
```

This generates:
- `migration/pages.json` - Page structure and content
- `migration/assets/` - Downloaded images and media
- `migration/content-map.json` - Content type mapping

#### 2.2 Import to Wix Headless CMS
```bash
# Import content to Wix Headless
node scripts/import-to-wix-headless.js
```

Or manually:
1. Go to your Wix Headless project
2. Open Content Manager
3. Create collections matching your content types
4. Import content via CSV or manual entry

### Phase 3: Page Implementation

#### 3.1 Create Page Templates
For each page type, create a Next.js page:

```typescript
// app/[page-slug]/page.tsx
import { getPage } from '@/lib/wix-api';

export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await getPage(params.slug);

  return (
    <div>
      <h1>{pageData.title}</h1>
      {/* Render page content */}
    </div>
  );
}
```

#### 3.2 Migrate Components
- [ ] Header/Navigation
- [ ] Footer
- [ ] Hero sections
- [ ] Content blocks
- [ ] Forms
- [ ] CTAs

### Phase 4: Asset Migration

#### 4.1 Image Optimization
```bash
# Optimize and migrate images
node scripts/optimize-assets.js
```

Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/assets/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

#### 4.2 Font Migration
Add fonts to `app/layout.tsx`:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

### Phase 5: Functionality Migration

#### 5.1 Forms
- Replace Wix forms with Next.js API routes
- Integrate with Wix Forms API or alternative service
- Implement validation and error handling

#### 5.2 SEO & Metadata
```typescript
// app/layout.tsx or page.tsx
export const metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
  openGraph: {
    title: 'Your Site Title',
    description: 'Your site description',
    images: ['/og-image.jpg'],
  },
};
```

#### 5.3 Analytics
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Phase 6: Testing & QA

#### 6.1 Functional Testing
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Images display properly
- [ ] Links are not broken

#### 6.2 Performance Testing
```bash
# Run Lighthouse CI
npm run build
lhci autorun
```

Targets:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

#### 6.3 Cross-Browser Testing
```bash
# Run Playwright E2E tests
yarn e2e
```

### Phase 7: Deployment

#### 7.1 Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_WIX_CLIENT_ID
```

#### 7.2 Alternative Deployment (Netlify, Azure)
See `docs/deployment.md` for platform-specific instructions.

### Phase 8: Go Live

#### 8.1 DNS Configuration
1. Update DNS records to point to new deployment
2. Configure SSL/TLS certificates
3. Set up redirects for changed URLs

#### 8.2 Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Enable analytics
- [ ] Test all critical user flows

## Post-Migration

### Performance Optimization
- [ ] Implement caching strategy
- [ ] Optimize images further
- [ ] Enable CDN
- [ ] Monitor Core Web Vitals

### Content Management
- [ ] Train team on Wix Headless CMS
- [ ] Document content workflows
- [ ] Set up staging environment

### Maintenance
- [ ] Schedule regular dependency updates
- [ ] Monitor site performance
- [ ] Review analytics regularly
- [ ] Plan feature enhancements

## Rollback Plan

If issues arise:
1. Revert DNS to point to original Wix site
2. Keep Wix site active during migration period
3. Test thoroughly in staging before DNS change

## Support Resources

- [Wix Headless Documentation](https://dev.wix.com/docs/go-headless)
- [Next.js Documentation](https://nextjs.org/docs)
- [Migration Scripts](./scripts/)
- [Bruno API Collection](./bruno/)

## Migration Timeline (Estimated)

- **Small Site** (5-10 pages): 1-2 weeks
- **Medium Site** (10-50 pages): 2-4 weeks
- **Large Site** (50+ pages): 4-8 weeks

Adjust based on:
- Content complexity
- Custom functionality
- Team capacity
- Testing requirements

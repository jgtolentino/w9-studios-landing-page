# CLAUDE.md — Project Instructions for Wix → Next.js Migration

## Project Overview

**Goal**: Migrate W9 Studios landing page from Wix to Next.js using Wix Headless CMS
**Approach**: Keep Wix as content management backend, migrate rendering to Next.js
**Timeline**: 2-4 weeks for complete migration

## Execution Model

- **Claude Code** orchestrates - plans, coordinates, validates migration phases
- **Bruno** executes API calls - handles Wix API authentication and data operations
- **GitHub Actions** automates - runs quality gates, E2E tests, performance audits
- **Vercel** deploys - hosts production and preview environments

## Architecture Decisions

### Migration Strategy: Wix Headless CMS
**Why**: Progressive migration path, familiar content workflow, minimal disruption

**Stack**:
- Next.js 13+ (App Router, React Server Components)
- TypeScript (type safety across migration)
- Tailwind CSS + Flowbite (component library)
- Wix SDK (@wix/sdk, @wix/data, @wix/api-client)

### Zero-Secret Architecture
- No credentials in code or repository
- Bruno vault: `~/.bruno/vault/` for local development
- Vercel environment variables for production
- GitHub Actions secrets for CI/CD

## Project Structure

```
wix-nextjs-migration/
├── app/                    # Next.js app directory (pages, layouts, components)
├── lib/                    # Utilities, Wix SDK helpers, API clients
├── components/             # Reusable React components
├── public/                 # Static assets (images, fonts, icons)
├── bruno/                  # API collection for Wix Headless operations
│   ├── Authentication/     # OAuth flows
│   ├── Content Manager/    # CMS CRUD operations
│   └── environments/       # Local & production configs
├── scripts/                # Migration utilities
│   ├── crawl-wix-site.js   # Extract content from existing Wix site
│   ├── download-assets.js  # Bulk asset downloader
│   └── import-to-wix.js    # Import content to Wix Headless
├── migration/              # Generated migration artifacts (gitignored)
│   ├── pages.json
│   ├── assets.json
│   ├── content-map.json
│   └── assets/
├── .github/workflows/      # CI/CD automation
├── .husky/                 # Pre-commit hooks
└── docs/                   # Documentation
```

## Communication Style

- **Evidence-based**: Validate migration steps before execution
- **Quality-gated**: Run tests, lint, type-check before commits
- **Direct and actionable**: Produce runnable code, clear instructions
- **Documentation-first**: Maintain migration logs, decisions, troubleshooting

## Development Workflow

### Standard Development Cycle
```bash
# 1. Start development
yarn dev

# 2. Make changes (components, pages, utilities)

# 3. Quality checks (automatic via Husky pre-commit)
yarn lint
yarn type-check
yarn test

# 4. Commit (triggers pre-commit hooks)
git add .
git commit -m "feat: descriptive message"

# 5. Push (triggers CI/CD)
git push
```

### Migration-Specific Workflow
```bash
# Phase 1: Content Discovery
node scripts/crawl-wix-site.js --url https://w9studio.net

# Phase 2: Content Import
node scripts/import-to-wix.js

# Phase 3: Build & Test
yarn build
yarn e2e
npx @lhci/cli autorun

# Phase 4: Deploy Preview
vercel

# Phase 5: Production Deploy
vercel --prod
```

## Quality Standards

### Code Quality
- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Airbnb config + Next.js rules
- **Prettier**: Consistent formatting (2 spaces, single quotes)
- **Husky**: Pre-commit hooks enforce quality gates

### Testing Requirements
- **Unit Tests**: ≥80% coverage for utilities and helpers
- **E2E Tests**: Critical user flows (Playwright)
- **Performance**: Lighthouse scores ≥90 (all categories)
- **Accessibility**: WCAG 2.1 AA compliance

### Performance Budgets
- **Initial Load**: <3s on 3G, <1s on WiFi
- **Bundle Size**: <500KB initial, <2MB total
- **Images**: Next.js Image component (automatic optimization)
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

## Environment Variables

### Required
```bash
NEXT_PUBLIC_WIX_CLIENT_ID     # Wix OAuth client ID (public)
```

### Optional
```bash
NEXT_PUBLIC_GA_ID             # Google Analytics tracking ID
NEXT_PUBLIC_SENTRY_DSN        # Error tracking (Sentry)
REVALIDATE_SECRET             # ISR revalidation webhook secret
```

### Bruno Vault (Local Development)
```bash
~/.bruno/vault/wix_client_id
~/.bruno/vault/wix_client_secret
~/.bruno/vault/wix_refresh_token
```

## Migration Phase Tracking

### Phase 1: Pre-Migration ✅ COMPLETE
- [x] Setup Next.js project with Wix template
- [x] Configure CI/CD pipeline (GitHub Actions)
- [x] Setup pre-commit hooks (Husky + lint-staged)
- [x] Create Bruno API collection
- [x] Write migration scripts (crawler, asset downloader)
- [x] Document migration process

### Phase 2: Content Discovery 🔄 IN PROGRESS
- [ ] Run site crawler on w9studio.net
- [ ] Inventory all pages and URLs
- [ ] Catalog assets (images, videos, fonts)
- [ ] Document content types and relationships
- [ ] Create content migration map

### Phase 3: Page Implementation ⏳ PENDING
- [ ] Create page templates (app/[slug]/page.tsx)
- [ ] Migrate components (Header, Footer, Hero, etc.)
- [ ] Implement dynamic routing
- [ ] Setup SEO metadata

### Phase 4: Asset Migration ⏳ PENDING
- [ ] Optimize and migrate images
- [ ] Setup Next.js Image component
- [ ] Migrate fonts (Google Fonts or local)
- [ ] Generate responsive images

### Phase 5: Functionality Migration ⏳ PENDING
- [ ] Replace forms with Next.js API routes
- [ ] Implement analytics (Google Analytics)
- [ ] Setup error tracking (Sentry)
- [ ] Configure contact form handlers

### Phase 6: Testing & QA ⏳ PENDING
- [ ] Write E2E tests for critical flows
- [ ] Run Lighthouse CI audits
- [ ] Cross-browser testing (Playwright)
- [ ] Accessibility audit

### Phase 7: Deployment ⏳ PENDING
- [ ] Deploy preview to Vercel
- [ ] Configure production environment
- [ ] Setup custom domain
- [ ] Configure SSL/TLS

### Phase 8: Go Live ⏳ PENDING
- [ ] DNS cutover
- [ ] Monitor performance and errors
- [ ] Validate analytics tracking
- [ ] Post-launch optimization

## Common Tasks & Commands

### Development
```bash
yarn dev                    # Start dev server (http://localhost:3000)
yarn build                  # Production build
yarn start                  # Start production server
yarn lint                   # Run ESLint
yarn type-check            # TypeScript type checking
yarn format                # Format code with Prettier
```

### Testing
```bash
yarn test                  # Run all tests
yarn test:unit            # Unit tests (when implemented)
yarn e2e                  # E2E tests (Playwright)
yarn e2e:headed           # E2E with browser UI
npx @lhci/cli autorun     # Lighthouse CI audit
```

### Migration Scripts
```bash
node scripts/crawl-wix-site.js --url <URL>     # Crawl existing site
node scripts/download-assets.js                 # Download assets
node scripts/import-to-wix.js                   # Import to Wix Headless
```

### Deployment
```bash
vercel                     # Deploy preview
vercel --prod             # Deploy production
vercel env ls             # List environment variables
vercel logs               # View deployment logs
```

## Troubleshooting

### Build Failures
```bash
# Clear cache and reinstall
rm -rf .next node_modules yarn.lock
yarn install
yarn build
```

### Type Errors
```bash
# Check for type issues
yarn type-check

# Common fix: regenerate types
yarn build  # Rebuilds Next.js types
```

### Wix API Issues
```bash
# Test authentication in Bruno
# Collection: Authentication → Get OAuth Token

# Check environment variables
cat .env.local | grep WIX
```

### Performance Issues
```bash
# Run Lighthouse audit
yarn build
npx @lhci/cli autorun

# Analyze bundle
ANALYZE=true yarn build
```

## Decision Log

### Why Wix Headless over Full Migration?
- **Pros**: Familiar CMS workflow, progressive migration, content team continuity
- **Cons**: Vendor lock-in, API limitations
- **Decision**: Start with Headless, evaluate full migration later

### Why Vercel over Netlify/Azure?
- **Pros**: Next.js optimization, zero-config, excellent DX
- **Cons**: Cost at scale
- **Decision**: Vercel for MVP, evaluate alternatives if traffic scales

### Why Flowbite over Custom Components?
- **Pros**: Faster development, accessible components, Tailwind integration
- **Cons**: Generic design, bundle size
- **Decision**: Use Flowbite for MVP, customize or replace as needed

## References

- [Wix Headless Documentation](https://dev.wix.com/docs/go-headless)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Wix SDK Reference](https://dev.wix.com/api/sdk)
- [Bruno API Client](https://www.usebruno.com/)
- [Vercel Deployment](https://vercel.com/docs)

## Project-Specific Notes

### W9 Studios Requirements
- Premium commercial production landing page
- Focus: Storytelling, visual impact, professional presentation
- Target: Film studios, production companies, creative agencies
- Key pages: Home, About, Portfolio, Services, Contact

### Design Considerations
- High-quality imagery and video
- Smooth animations and transitions
- Mobile-first responsive design
- Fast load times despite rich media
- Professional, modern aesthetic

### Content Strategy
- Hero section with video background
- Case studies/portfolio showcase
- Service offerings with visual examples
- Team/studio information
- Contact form with project inquiry fields

---

**Last Updated**: 2025-10-03
**Project Status**: Phase 1 Complete, Phase 2 In Progress
**Next Milestone**: Complete content discovery and mapping

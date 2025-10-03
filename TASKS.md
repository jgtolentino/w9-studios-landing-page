# TASKS.md — Active Task List

**Project**: W9 Studios Wix → Next.js Migration
**Current Phase**: Phase 2 - Content Discovery (Week 1, Days 3-5)
**Last Updated**: 2025-10-03

---

## 🚀 Immediate Tasks (This Week)

### Phase 2: Content Discovery 🔄 IN PROGRESS

#### Task 2.1: Site Crawling ⏳ NEXT
**Priority**: High | **Effort**: 2-3 hours | **Owner**: Claude Code

- [ ] Run crawler on w9studio.net
  ```bash
  node scripts/crawl-wix-site.js --url https://www.w9studio.net
  ```
- [ ] Verify output in `migration/pages.json`
- [ ] Review page structure and content extraction
- [ ] Identify any missing or malformed content

**Acceptance Criteria**:
- All pages cataloged with URLs, titles, and content
- Page hierarchy and navigation structure captured
- Content sections identified and categorized

**Blockers**: Need to verify w9studio.net accessibility

---

#### Task 2.2: Asset Inventory ⏳ PENDING
**Priority**: High | **Effort**: 2-3 hours | **Owner**: Claude Code

- [ ] Run asset downloader
  ```bash
  node scripts/download-assets.js
  ```
- [ ] Verify downloads in `migration/assets/`
- [ ] Catalog asset metadata (dimensions, formats, sizes)
- [ ] Identify assets needing optimization

**Acceptance Criteria**:
- All images downloaded with metadata
- Asset inventory JSON generated
- Asset sizes and formats documented

**Dependencies**: Completion of Task 2.1

---

#### Task 2.3: Content Type Mapping ⏳ PENDING
**Priority**: Medium | **Effort**: 3-4 hours | **Owner**: Claude Code

- [ ] Analyze crawled content structure
- [ ] Define content types for Wix Headless
  - Hero sections
  - Portfolio/case studies
  - Service descriptions
  - Team/about content
  - Contact forms
- [ ] Create content schema document
- [ ] Map Wix sections → Next.js components

**Acceptance Criteria**:
- Content types documented in `migration/content-map.json`
- Component mapping defined
- Wix Headless schema drafted

**Dependencies**: Completion of Task 2.1

---

#### Task 2.4: Migration Complexity Estimation ⏳ PENDING
**Priority**: Medium | **Effort**: 1-2 hours | **Owner**: Claude Code

- [ ] Review content inventory
- [ ] Assess component complexity
- [ ] Identify custom functionality requirements
- [ ] Update timeline estimates in PLANNING.md

**Acceptance Criteria**:
- Complexity assessment documented
- Timeline adjusted if needed
- Risk areas identified

**Dependencies**: Completion of Tasks 2.1, 2.2, 2.3

---

## 📋 Backlog (Upcoming Phases)

### Phase 3: Page Implementation (Week 2)

#### Task 3.1: Setup Page Structure
- [ ] Create `app/page.tsx` (home)
- [ ] Create `app/[slug]/page.tsx` (dynamic pages)
- [ ] Create `app/portfolio/[project]/page.tsx` (case studies)
- [ ] Implement root layout with navigation
- [ ] Setup page-specific layouts

#### Task 3.2: Component Migration - Critical Path
- [ ] Header/Navigation component
- [ ] Footer component
- [ ] Hero section component
- [ ] Basic page layouts

#### Task 3.3: Component Migration - Content Components
- [ ] Portfolio grid component
- [ ] Case study detail component
- [ ] Service cards component
- [ ] About/team sections

#### Task 3.4: Component Migration - Interactive Components
- [ ] Contact form component
- [ ] Newsletter signup component
- [ ] Video player component
- [ ] Image gallery component

#### Task 3.5: Wix Headless Integration
- [ ] Setup Wix SDK client
- [ ] Implement data fetching utilities
- [ ] Configure ISR (Incremental Static Regeneration)
- [ ] Setup preview mode

---

### Phase 4: Asset Migration (Week 2, Days 4-5)

#### Task 4.1: Image Optimization
- [ ] Convert images to WebP/AVIF
- [ ] Generate responsive variants
- [ ] Implement Next.js Image component
- [ ] Setup image CDN

#### Task 4.2: Video Optimization
- [ ] Optimize video files
- [ ] Implement lazy loading
- [ ] Setup video CDN
- [ ] Create video thumbnails

#### Task 4.3: Font Migration
- [ ] Identify custom fonts
- [ ] Migrate to Google Fonts or self-hosted
- [ ] Implement font loading strategy
- [ ] Configure font subsetting

#### Task 4.4: Icon & Graphics
- [ ] Migrate to SVG where possible
- [ ] Create icon sprite/component library
- [ ] Optimize raster graphics

---

### Phase 5: Functionality Migration (Week 3, Days 1-3)

#### Task 5.1: Forms Implementation
- [ ] Build contact form UI with validation
- [ ] Create API route handler
- [ ] Integrate email service
- [ ] Add spam protection

#### Task 5.2: SEO & Metadata
- [ ] Implement dynamic metadata
- [ ] Create sitemap.xml
- [ ] Configure robots.txt
- [ ] Setup structured data

#### Task 5.3: Analytics & Tracking
- [ ] Google Analytics 4 setup
- [ ] Event tracking
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

#### Task 5.4: Third-Party Integrations
- [ ] Social media embeds
- [ ] Map integration
- [ ] Video platform integration

---

### Phase 6: Testing & QA (Week 3, Days 4-5)

#### Task 6.1: Functional Testing
- [ ] Manual QA of all pages
- [ ] Cross-browser testing
- [ ] Device testing

#### Task 6.2: Performance Testing
- [ ] Lighthouse CI audits
- [ ] Core Web Vitals validation
- [ ] Bundle analysis

#### Task 6.3: E2E Testing
- [ ] Write critical user flow tests
- [ ] Form validation scenarios
- [ ] Mobile-specific flows

#### Task 6.4: Accessibility Testing
- [ ] Automated testing (axe-core)
- [ ] Keyboard navigation
- [ ] Screen reader testing

#### Task 6.5: Security Testing
- [ ] Form validation and sanitization
- [ ] API route security
- [ ] Dependency vulnerability scan

---

### Phase 7: Deployment (Week 4, Days 1-2)

#### Task 7.1: Staging Deployment
- [ ] Deploy to Vercel preview
- [ ] Configure staging environment
- [ ] Stakeholder review

#### Task 7.2: Production Setup
- [ ] Create production project
- [ ] Configure environment variables
- [ ] Setup custom domain
- [ ] Configure caching and CDN

#### Task 7.3: Pre-Launch Checklist
- [ ] Backup current site
- [ ] Document rollback procedure
- [ ] Setup monitoring
- [ ] Final approval

---

### Phase 8: Go Live (Week 4, Days 3-5)

#### Task 8.1: DNS Cutover
- [ ] Update DNS records
- [ ] Monitor DNS propagation
- [ ] Setup redirects

#### Task 8.2: Post-Launch Monitoring
- [ ] Monitor error rates
- [ ] Track performance metrics
- [ ] Validate analytics

#### Task 8.3: Post-Launch Optimization
- [ ] Review performance data
- [ ] Implement improvements
- [ ] Fine-tune caching

#### Task 8.4: Documentation & Handoff
- [ ] Content management guide
- [ ] Developer documentation
- [ ] Troubleshooting runbook

---

## 🔧 Technical Debt & Improvements

### High Priority
- [ ] Implement unit tests for utilities (target: 80% coverage)
- [ ] Add error boundaries for React components
- [ ] Implement request rate limiting for API routes
- [ ] Setup automatic dependency updates (Renovate/Dependabot)

### Medium Priority
- [ ] Optimize bundle size (code splitting analysis)
- [ ] Implement service worker for offline functionality
- [ ] Add i18n support (if multi-language needed)
- [ ] Create Storybook for component documentation

### Low Priority
- [ ] Implement dark mode
- [ ] Add micro-animations for better UX
- [ ] Create admin dashboard for content stats
- [ ] Implement A/B testing framework

---

## 🐛 Known Issues

### Critical
- None currently

### High
- None currently

### Medium
- [ ] Need to verify Bruno vault setup for Wix API credentials
- [ ] Confirm w9studio.net accessibility and structure

### Low
- [ ] Consider adding component screenshots to Storybook
- [ ] Evaluate need for Sentry vs. alternative error tracking

---

## 📝 Notes & Context

### Current Status
- **Phase 1 Complete**: Development environment, CI/CD, documentation
- **Phase 2 In Progress**: Ready to run content discovery scripts
- **Blockers**: None currently

### Next Actions
1. Verify w9studio.net structure and accessibility
2. Run site crawler (Task 2.1)
3. Run asset downloader (Task 2.2)
4. Create content mapping (Task 2.3)

### Questions to Resolve
- [ ] What is the primary domain? (w9studio.net vs. other)
- [ ] Are there any protected/gated content areas?
- [ ] What email service for forms? (SendGrid, Resend, Mailgun)
- [ ] What analytics setup? (GA4, Plausible, custom)

### Decisions Needed
- [ ] Finalize content schema for Wix Headless
- [ ] Confirm email service provider
- [ ] Approve design adjustments (if any)
- [ ] Define success metrics for launch

---

## 📊 Progress Tracking

### Phase Completion
- [x] Phase 1: Foundation Setup (100%)
- [ ] Phase 2: Content Discovery (10% - crawler ready, not run)
- [ ] Phase 3: Page Implementation (0%)
- [ ] Phase 4: Asset Migration (0%)
- [ ] Phase 5: Functionality Migration (0%)
- [ ] Phase 6: Testing & QA (0%)
- [ ] Phase 7: Deployment (0%)
- [ ] Phase 8: Go Live (0%)

### Overall Project: 12% Complete

### Time Tracking
- **Estimated Total**: 20 days (4 weeks)
- **Elapsed**: 2 days
- **Remaining**: 18 days
- **On Track**: Yes ✅

---

## 🎯 Success Criteria (Reminder)

### Technical
- ✅ All Lighthouse scores >90
- ✅ Zero critical accessibility issues
- ✅ All E2E tests passing
- ✅ No security vulnerabilities

### Business
- ✅ Uptime >99.9%
- ✅ Error rate <0.1%
- ✅ Page load time <3s (3G)
- ✅ Equal or better conversion rate

### Quality
- ✅ TypeScript strict mode, no `any`
- ✅ ESLint + Prettier passing
- ✅ Pre-commit hooks enforced
- ✅ CI/CD pipeline green

---

**Current Focus**: Task 2.1 - Run site crawler on w9studio.net
**Next Milestone**: Complete Phase 2 content discovery
**Estimated Completion**: End of Week 1 (2 days remaining)

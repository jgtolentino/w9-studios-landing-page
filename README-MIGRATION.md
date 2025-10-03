# Wix → Next.js Migration Project

Clean, production-ready Wix Headless migration setup with Claude Code automation.

## 🎯 Overview

This project provides a complete migration path from Wix to Next.js using the official [Wix Headless CMS Next.js template](https://github.com/wix/wix-cms-nextjs-template) with integrated Claude Code workflow automation.

**Two Migration Paths:**
1. **Keep Wix as Headless CMS** - Migrate rendering to Next.js, keep content management in Wix
2. **Full Migration** - Export content and move to alternative CMS

## 📋 What's Included

### ✅ Official Wix Headless Template
- Next.js 13 with App Router
- TypeScript, Tailwind CSS, Flowbite
- Wix SDK integration (`@wix/sdk`, `@wix/data`)
- Playwright E2E tests included

### ✅ Claude Code Workflow Automation
- **CI Pipeline** - Automated quality, E2E, and performance testing
- **Pre-commit Hooks** - Lint, type-check, quick tests via Husky
- **Lighthouse CI** - Performance monitoring (90+ scores required)
- **GitHub Actions** - Quality gates on every PR

### ✅ Migration Tools
- **Site Crawler** - Extract content, structure, and assets from existing Wix site
- **Asset Downloader** - Bulk download images and media
- **Migration Checklist** - Comprehensive step-by-step guide

### ✅ Bruno API Collection
- **Zero-secret architecture** - Credentials via vault (`~/.bruno/vault/`)
- **Wix API integration** - OAuth, Content Manager, Data APIs
- **Environment-aware** - Local and production configurations

### ✅ Deployment Ready
- **Vercel** - One-command deployment with automatic CI/CD
- **Netlify** - Alternative deployment with optimized config
- **Azure Static Web Apps** - Enterprise deployment option
- **Docker** - Containerized deployment for any platform

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd ~/Documents/W9/wix-nextjs-migration
yarn install
```

### 2. Configure Wix Headless
```bash
# Copy environment template
cp .env.template .env.local

# Get your Wix Client ID:
# 1. Go to https://www.wix.com/headless
# 2. Create new project
# 3. Add "Content Manager" app
# 4. Copy OAuth Client ID

# Add to .env.local
echo "NEXT_PUBLIC_WIX_CLIENT_ID=your-client-id-here" >> .env.local
```

### 3. Setup Bruno Vault (Optional)
```bash
# Create vault directory
mkdir -p ~/.bruno/vault

# Add Wix credentials
echo "your-client-id" > ~/.bruno/vault/wix_client_id
echo "your-client-secret" > ~/.bruno/vault/wix_client_secret
chmod 600 ~/.bruno/vault/wix_*
```

### 4. Run Development Server
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[MIGRATE_WIX_TO_NEXT.md](./MIGRATE_WIX_TO_NEXT.md)** | Complete migration guide with 8-phase process |
| **[docs/deployment.md](./docs/deployment.md)** | Deployment instructions for all platforms |
| **[bruno/README.md](./bruno/)** | Bruno API collection usage |
| **[README.md](./README.md)** | Original Wix template documentation |

## 🛠️ Migration Workflow

### Phase 1: Content Discovery
```bash
# Crawl your existing Wix site
node scripts/crawl-wix-site.js --url https://your-site.wix.com

# Download assets
node scripts/download-assets.js
```

**Output:**
- `migration/pages.json` - Page structure and content
- `migration/assets.json` - Asset inventory
- `migration/content-map.json` - Content type organization
- `migration/assets/` - Downloaded images

### Phase 2: Content Migration
Review `MIGRATE_WIX_TO_NEXT.md` for:
- Content import strategies
- Page template creation
- Component migration
- SEO setup

### Phase 3: Deployment
See `docs/deployment.md` for platform-specific instructions.

## 🧪 Testing & Quality

### Run Tests
```bash
# Lint
yarn lint

# Type check
yarn type-check

# Unit tests (when implemented)
yarn test:unit

# E2E tests
yarn e2e

# All quality checks
yarn test
```

### Performance Testing
```bash
# Build and run Lighthouse CI
yarn build
npx @lhci/cli autorun
```

**Quality Gates:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## 📦 Project Structure

```
wix-nextjs-migration/
├── app/                    # Next.js app directory
├── bruno/                  # API collection (zero-secret)
│   ├── Authentication/     # OAuth flows
│   ├── Content Manager/    # CMS operations
│   └── environments/       # Local & production configs
├── docs/                   # Documentation
│   └── deployment.md       # Platform deployment guides
├── migration/              # Migration artifacts (generated)
│   ├── pages.json
│   ├── assets.json
│   ├── content-map.json
│   └── assets/
├── scripts/                # Migration utilities
│   ├── crawl-wix-site.js   # Content crawler
│   └── download-assets.js  # Asset downloader
├── .github/workflows/      # CI/CD automation
├── .husky/                 # Pre-commit hooks
├── MIGRATE_WIX_TO_NEXT.md  # Migration guide
├── README-MIGRATION.md     # This file
└── README.md               # Original template docs
```

## 🔐 Security & Secrets

**Zero-Secret Architecture:**
- No credentials in code or `.env` files
- Bruno vault: `~/.bruno/vault/wix_*`
- Vercel/Netlify: Platform secret management
- Azure: Key Vault integration

**Environment Variables:**
```bash
NEXT_PUBLIC_WIX_CLIENT_ID     # Required: Wix OAuth client ID
NEXT_PUBLIC_GA_ID             # Optional: Google Analytics
NEXT_PUBLIC_SENTRY_DSN        # Optional: Error tracking
REVALIDATE_SECRET             # Optional: ISR secret
```

## 🚢 Deployment Options

### Vercel (Recommended)
```bash
vercel                      # Preview
vercel --prod              # Production
```

### Netlify
```bash
netlify deploy --prod --build
```

### Azure Static Web Apps
```bash
az staticwebapp create --name wix-nextjs --resource-group wix-rg
```

### Docker
```bash
docker build -t wix-nextjs .
docker run -p 3000:3000 wix-nextjs
```

## 📊 CI/CD Pipeline

**Automatic on every PR:**
- ✅ Lint & TypeScript checks
- ✅ Unit tests (when implemented)
- ✅ E2E tests (Playwright)
- ✅ Lighthouse performance audit
- ✅ Build verification

**Deployment:**
- `main` branch → Production
- PRs → Preview deployments

## 🤝 Contributing

This is a migration project template. Customize for your specific needs:

1. Update `app/` with your page templates
2. Modify `tailwind.config.js` for your design system
3. Extend Bruno collection for custom API needs
4. Add custom migration scripts to `scripts/`

## 📖 Resources

- [Wix Headless Documentation](https://dev.wix.com/docs/go-headless)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Wix CMS Starter](https://vercel.com/templates/next.js/wix-cms)
- [Bruno API Client](https://www.usebruno.com/)

## 🐛 Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf .next node_modules
yarn install
yarn build
```

### Environment Issues
```bash
# Verify environment variables
vercel env ls
# or
cat .env.local
```

### Migration Script Errors
```bash
# Check migration directory permissions
ls -la migration/
# Rerun with verbose logging
DEBUG=* node scripts/crawl-wix-site.js --url https://your-site.wix.com
```

## 📄 License

This project uses the [Wix CMS Next.js Template](https://github.com/wix/wix-cms-nextjs-template) which is licensed under MIT.

Migration tools and automation by Claude Code - use freely for your projects.

---

**Ready to migrate?** Start with `MIGRATE_WIX_TO_NEXT.md` for the complete guide.

**Questions?** Review `docs/deployment.md` or the official Wix Headless documentation.

**Need help?** Check the troubleshooting section or open an issue on GitHub.

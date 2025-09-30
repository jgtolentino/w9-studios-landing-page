# W9 Studios - Premium Production Studio Landing Page

A premium, award-ready landing page for W9 Studios, a top-tier commercial production studio in Metro Manila targeting advertising agencies.

## 🎬 Project Overview

Based on comprehensive market research for Metro Manila's production industry, this landing page positions W9 Studios as a premium production partner for advertising agencies, featuring:

- **Target Market**: Advertising agencies (GIGIL, TBWA, Leo Burnett, DDB, Ogilvy, VML, etc.)
- **Positioning**: Premium but accessible, specializing in TV commercials, corporate videos, and digital content
- **Key Differentiators**: 2-4 hour response time, agency DNA, cinematic excellence

## 🚀 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: GSAP with ScrollTrigger
- **3D Elements**: Three.js (optional)
- **Video**: Custom video player with React Player
- **Icons**: Lucide React
- **Smooth Scroll**: Locomotive Scroll integration

## 🎨 Design System

### Color Palette (from research)
- **Primary Black**: #1A1A1A
- **Studio Gray**: #2A2A2A
- **Electric Blue**: #0066FF (primary accent)
- **Vibrant Red**: #E84141 (secondary accent)
- **Off-White**: #F5F5F5

### Typography
- **Font**: Inter variable font
- **Headlines**: Clamp sizing for responsive typography
- **Body**: Optimized for readability on dark backgrounds

## 📁 Project Structure

```
W9/landing-page/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Main landing page
│   └── globals.css        # Global styles and Tailwind
├── components/
│   ├── Hero.tsx           # Video hero section
│   ├── Navigation.tsx     # Sticky navigation
│   ├── Portfolio.tsx      # Filterable project grid
│   ├── Services.tsx       # Service offerings
│   ├── Contact.tsx        # Qualification form
│   ├── Showreel.tsx       # 60-90 second reel
│   ├── Stats.tsx          # Key metrics
│   ├── About.tsx          # Company positioning
│   └── Footer.tsx         # Contact info & links
├── public/
│   ├── videos/           # Video assets
│   └── images/           # Image assets
└── lib/                  # Utility functions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

## 📊 Key Features

### Hero Section
- Full-screen video background (5-10 second loop)
- Overlaid text with value proposition
- Mute/unmute controls
- Smooth scroll indicator

### Portfolio Grid
- Filterable by category (TV Commercial, Corporate, Digital)
- Filterable by industry (FMCG, Tech, Finance, Healthcare)
- Hover video previews
- Detailed case studies with metrics

### Services Section
- 6 core services with pricing ranges
- Monthly retainer packages (₱165K-330K)
- Equipment rental information

### Contact Form
- Qualification fields (budget, timeline, services)
- 2-4 hour response promise
- Direct producer contact

### Performance Targets
- Lighthouse score: 85+
- Load time: <3 seconds on 4G
- 60fps animations on desktop
- Mobile-first responsive design

## 💰 Business Model (from research)

### Revenue Targets
- **Year 1**: ₱8.25-13.75 million ($150-250K)
- **Year 2**: ₱16.5-27.5 million (100-150% growth)
- **Year 3**: ₱27.5-55 million (50-100% growth)

### Pricing Strategy
- **TV Commercials**: ₱300K-1M per spot
- **Corporate Videos**: ₱75K-250K
- **Digital Content**: ₱25K-150K
- **Monthly Retainers**: ₱165K-330K

### Client Mix
- 40% TV commercials
- 30% corporate videos
- 30% digital/social content

## 📈 Marketing & SEO

### SEO Optimization
- Semantic HTML structure
- Meta tags for social sharing
- Performance optimization
- Schema markup for local business

### Lead Generation
- Qualification form with budget ranges
- CRM integration ready
- Automated follow-up workflows
- 2-4 hour response commitment

## 🏆 Award-Winning Design Patterns

Following Awwwards Site of the Year patterns:
- Immediate visual impact
- Portfolio-forward design
- Minimal chrome, maximum content
- Dark theme for cinematic feel
- Smooth scroll animations
- Micro-interactions on all CTAs

## 📱 Mobile Optimization

- 62% of Philippines traffic is mobile
- Adaptive quality settings
- Simplified animations on mobile
- Touch-optimized interactions
- Progressive enhancement

## 🔧 Customization

### Adding Projects
Edit `components/Portfolio.tsx` to add new projects to the portfolio grid.

### Updating Services
Modify `components/Services.tsx` to adjust service offerings and pricing.

### Contact Form
Configure form submission in `components/Contact.tsx` - integrate with your CRM/email service.

## 📝 Next Steps

1. **Content**: Add real video content, client logos, team photos
2. **Integration**: Connect contact form to CRM (HubSpot/Pipedrive)
3. **Analytics**: Add Google Analytics/Tag Manager
4. **Hosting**: Deploy to Vercel/Netlify
5. **Domain**: Configure custom domain
6. **SSL**: Ensure HTTPS is enabled
7. **CDN**: Set up video CDN for optimal delivery

## 🤝 Support

For questions about the implementation or business strategy, refer to the comprehensive business plan document provided.

---

Built with precision for W9 Studios - Where cinematic excellence meets strategic creative execution.

# W9 Studios Landing Page - Asset Inventory

## 🎯 Priority Legend
- **🔴 Critical**: Required for launch (blocking)
- **🟡 High**: Should have for professional appearance
- **🟢 Medium**: Nice to have, can use improved placeholders temporarily
- **⚪ Low**: Optional enhancements

---

## 📹 VIDEO ASSETS

### Hero Section
**🔴 Critical - Hero Background Video**
- **File**: `/public/videos/hero-showreel.mp4`
- **Specs**:
  - Duration: 15-30 seconds (loopable)
  - Resolution: 1920x1080 minimum (4K preferred)
  - Format: MP4 (H.264)
  - Audio: Optional (user can unmute)
  - Content: Cinematic B-roll showcasing production quality
- **Suggestions**:
  - Multi-camera shoot footage
  - Behind-the-scenes on set
  - Lighting setups and camera moves
  - Mix of indoor/outdoor locations
  - Should be color graded professionally

### Showreel Section
**🔴 Critical - Main Showreel**
- **File**: `/public/videos/showreel-2024.mp4`
- **Specs**:
  - Duration: 90 seconds
  - Resolution: 1920x1080 minimum
  - Format: MP4 (H.264)
  - Audio: Music-driven edit with sound design
- **Content**: Best work compilation from 2024-2025
  - 25+ projects featured
  - 15 major brands
  - 8 award-winning campaigns
  - Fast-paced, dynamic editing
  - Brand logos on screen
  - Music: Cinematic/epic track

### Portfolio Project Videos
**🟡 High - Individual Project Videos**
- **Files**: 6 project videos needed
  1. `/public/videos/jollibee-commercial.mp4` - Summer Campaign 2024
  2. `/public/videos/bdo-corporate.mp4` - Digital Transformation
  3. `/public/videos/samsung-launch.mp4` - Galaxy S24 Launch
  4. `/public/videos/sanmiguel-heritage.mp4` - Heritage Documentary
  5. `/public/videos/makati-med-heroes.mp4` - Healthcare Heroes
  6. `/public/videos/maxs-food.mp4` - Food Cinematography
- **Specs**: 30-60 seconds each, 1920x1080, MP4

---

## 🖼️ IMAGE ASSETS

### Portfolio Thumbnails
**🟡 High - Project Thumbnails**
- **Files**: 6 high-quality stills
  1. `/public/images/portfolio/jollibee-thumb.jpg` - Family eating at Jollibee
  2. `/public/images/portfolio/bdo-thumb.jpg` - Banking/digital interface
  3. `/public/images/portfolio/samsung-thumb.jpg` - Galaxy S24 product shot
  4. `/public/images/portfolio/sanmiguel-thumb.jpg` - Heritage/historical scene
  5. `/public/images/portfolio/makati-med-thumb.jpg` - Healthcare workers
  6. `/public/images/portfolio/maxs-thumb.jpg` - Food styling shot
- **Specs**:
  - Resolution: 1920x1080 (16:9 aspect ratio)
  - Format: JPG (optimized, <500KB each)
  - Content: Best representative frame from each video
  - Professional color grading

### About Section - Behind the Scenes
**🟢 Medium - BTS Photography**
- **Files**: 4 BTS images
  1. `/public/images/about/director-at-work.jpg` - Director with monitor/camera
  2. `/public/images/about/cinema-camera.jpg` - RED/ARRI camera setup
  3. `/public/images/about/post-production.jpg` - Color grading suite
  4. `/public/images/about/client-review.jpg` - Team reviewing with client
- **Specs**:
  - Various aspect ratios (video: 16:9, square: 1:1)
  - Resolution: 1920x1080 minimum
  - Format: JPG (optimized)
  - Content: Professional BTS photography showing your process

### Team Photos
**🟡 High - Leadership Team Portraits**
- **Files**: 3 professional headshots
  1. `/public/images/team/ceo.jpg` - Maria Santos (placeholder name)
  2. `/public/images/team/cco.jpg` - Carlos Reyes (placeholder name)
  3. `/public/images/team/coo.jpg` - Ana Dela Cruz (placeholder name)
- **Specs**:
  - Resolution: 800x800 (square)
  - Format: JPG
  - Style: Professional, studio-lit or environmental portraits
  - Background: Clean, professional
- **Note**: Update actual names in `About.tsx` component

### Client Logos
**🟡 High - Featured Client Logos**
- **Files**: 6+ client logos for showreel section
  - `/public/images/clients/logo-1.png` through `/public/images/clients/logo-6.png`
- **Specs**:
  - Format: PNG with transparency
  - Resolution: 400x200 (approximate, maintain aspect ratio)
  - Style: White/monochrome versions for dark background
  - Clients: Major brands you've worked with
- **Location**: Showreel component, line 82-85

### Social Proof / Awards
**🟢 Medium - Award Badges**
- **Files**: Optional award logos
  - Cannes Lions
  - Spikes Asia
  - Kidlat Awards
- **Format**: PNG with transparency
- **Use**: Footer or About section

### Brand Assets
**⚪ Low - W9 Studios Branding**
- `/public/images/logo/w9-logo-light.png` - White logo for dark backgrounds
- `/public/images/logo/w9-logo-dark.png` - Dark logo for light backgrounds
- `/public/images/logo/w9-icon.png` - Favicon/app icon
- **Specs**: SVG preferred (scalable), PNG fallback

---

## 📝 CONTENT TO UPDATE

### Hero Section (`Hero.tsx`)
**Current Placeholder Text**:
```
"We Craft Cinematic Experiences"
"Production studio for advertising agencies in Metro Manila.
TV commercials, corporate films, digital content."
```
**✅ Action**: Verify this aligns with your actual positioning

### About Section (`About.tsx`)
**🔴 Critical - Replace Placeholder Names & Bios**:
- **Line 136-140**: CEO - Maria Santos bio
- **Line 150-154**: CCO - Carlos Reyes bio
- **Line 164-168**: COO - Ana Dela Cruz bio

**Replace with**:
- Actual executive names
- Real titles
- Authentic experience/credentials
- Link to LinkedIn profiles (optional)

**Update Company Background** (Line 22-26):
```
"Founded by industry veterans with 30+ years combined experience at Hit Productions,
Loudbox Studios, and international co-productions."
```
**Action**: Update with actual founding story and credentials

### Portfolio Projects (`Portfolio.tsx`)
**🟡 High - Update Project Details**:

Each project needs:
1. **Real client names** (or replace with actual clients)
2. **Accurate project descriptions**
3. **Real metrics/results** (if available)
4. **Correct services provided**
5. **Video links** to actual work

**Current placeholders** (Lines 23-108):
- 6 fictional projects with made-up clients
- Estimated metrics
- Generic descriptions

**Action**: Replace entire projects array with real case studies

### Services Pricing (`Services.tsx`)
**🟢 Medium - Verify Pricing**:
- **Line 20**: TV Commercial: ₱300K - 1M per spot
- **Line 33**: Corporate Video: ₱75K - 250K per project
- **Line 46**: Digital Content: ₱25K - 150K per series
- **Line 85**: Post-Production: ₱50K - 150K per project
- **Line 99-124**: Retainer packages: ₱165K, ₱330K, Custom

**Action**: Confirm these align with your actual pricing structure

### Stats Section (`Stats.tsx`)
**🟢 Medium - Update Real Statistics**:
- **Line 7**: "#1 Commercial Production in Asia" - Verify claim
- **Line 12**: "₱3.53B Metro Manila Ad Market" - Update if needed
- **Line 17**: "95% Client Retention Rate" - Use real data
- **Line 22**: "2-4hr Response Time" - Verify SLA

---

## 🎨 DESIGN SYSTEM ASSETS

### Custom Cursor
**✅ Current Status**: Implemented with gradient effect
**⚪ Optional Enhancement**:
- Custom cursor icon/logo instead of generic dot
- File: `/public/images/cursor-icon.svg`

### Favicon & Meta Images
**🟡 High - SEO Assets**:
- `/public/favicon.ico` - 32x32 favicon
- `/public/og-image.jpg` - 1200x630 Open Graph image
- `/public/twitter-image.jpg` - 1200x630 Twitter card image
- **Note**: Currently using placeholder `http://localhost:3000/og-image.jpg` (line 7-11 in metadata)

**Update Required**:
- Replace localhost URLs with production URLs
- Create actual social share images
- Update in `app/page.tsx` metadata export

---

## 📂 RECOMMENDED DIRECTORY STRUCTURE

```
public/
├── videos/
│   ├── hero-showreel.mp4              [🔴 Critical]
│   ├── showreel-2024.mp4              [🔴 Critical]
│   └── projects/
│       ├── jollibee-commercial.mp4    [🟡 High]
│       ├── bdo-corporate.mp4          [🟡 High]
│       ├── samsung-launch.mp4         [🟡 High]
│       ├── sanmiguel-heritage.mp4     [🟡 High]
│       ├── makati-med-heroes.mp4      [🟡 High]
│       └── maxs-food.mp4              [🟡 High]
├── images/
│   ├── portfolio/                     [🟡 High]
│   │   ├── jollibee-thumb.jpg
│   │   ├── bdo-thumb.jpg
│   │   ├── samsung-thumb.jpg
│   │   ├── sanmiguel-thumb.jpg
│   │   ├── makati-med-thumb.jpg
│   │   └── maxs-thumb.jpg
│   ├── about/                         [🟢 Medium]
│   │   ├── director-at-work.jpg
│   │   ├── cinema-camera.jpg
│   │   ├── post-production.jpg
│   │   └── client-review.jpg
│   ├── team/                          [🟡 High]
│   │   ├── ceo.jpg
│   │   ├── cco.jpg
│   │   └── coo.jpg
│   ├── clients/                       [🟡 High]
│   │   ├── logo-1.png
│   │   ├── logo-2.png
│   │   ├── logo-3.png
│   │   ├── logo-4.png
│   │   ├── logo-5.png
│   │   └── logo-6.png
│   ├── awards/                        [🟢 Medium]
│   │   ├── cannes-lions.png
│   │   ├── spikes-asia.png
│   │   └── kidlat-awards.png
│   └── logo/                          [⚪ Low]
│       ├── w9-logo-light.svg
│       ├── w9-logo-dark.svg
│       └── w9-icon.png
├── og-image.jpg                       [🟡 High]
├── twitter-image.jpg                  [🟡 High]
└── favicon.ico                        [🟡 High]
```

---

## 🚀 LAUNCH CHECKLIST

### Phase 1: Minimum Viable Launch (MVP)
- [ ] Hero background video (hero-showreel.mp4)
- [ ] Main showreel video (showreel-2024.mp4)
- [ ] 6 portfolio thumbnail images
- [ ] Update team names and photos
- [ ] Replace client logo placeholders
- [ ] Add favicon and OG images
- [ ] Update metadata URLs from localhost

### Phase 2: Professional Polish
- [ ] Add all 6 project videos
- [ ] Add 4 BTS photos in About section
- [ ] Verify and update all metrics/stats
- [ ] Update real project case studies with metrics
- [ ] Add award badges

### Phase 3: Content Refinement
- [ ] Replace generic project descriptions with real case studies
- [ ] Add client testimonials (if applicable)
- [ ] Verify all pricing is accurate
- [ ] Add more client logos (expand to 12+)

---

## 📊 ASSET SPECIFICATIONS SUMMARY

### Video Standards
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 minimum, 4K preferred for hero
- **Bitrate**: 8-12 Mbps for web
- **Audio**: AAC, 128-192 kbps
- **Frame Rate**: 24fps or 30fps

### Image Standards
- **Thumbnails**: 1920x1080, JPG, <500KB
- **Photos**: 1920x1080+, JPG, <800KB
- **Logos**: PNG with transparency, 400x200 average
- **Social**: OG images 1200x630, JPG, <1MB

### File Naming Convention
- Use lowercase with hyphens: `hero-showreel.mp4`
- Be descriptive: `jollibee-summer-campaign-thumb.jpg`
- Version if needed: `showreel-2024-v2.mp4`

---

## 💡 PRODUCTION NOTES

### Video Optimization Tips
1. **Compress videos** using HandBrake or FFmpeg before upload
2. **Loop seamlessly** for hero video (match first/last frames)
3. **Add fade in/out** for smoother looping
4. **Mute by default** for autoplay compliance
5. **Consider lazy loading** for project videos

### Image Optimization Tips
1. **Use ImageOptim** or TinyPNG for compression
2. **WebP format** as alternative for modern browsers
3. **Responsive images** with srcset for mobile optimization
4. **Lazy loading** for below-the-fold images

### Content Guidelines
1. **Real metrics > placeholder numbers** - Use actual data or remove
2. **Client approval** - Get permission to showcase work
3. **NDA compliance** - Don't include confidential projects
4. **Award credentials** - Only show awards you've actually won
5. **Team bios** - Be authentic, not inflated

---

## 📞 NEXT STEPS

1. **Prioritize Critical Assets** (🔴):
   - Hero video
   - Main showreel
   - Update team names/bios

2. **Schedule Content Gathering**:
   - Identify best 6 projects for portfolio
   - Export videos and thumbnails
   - Request client logos
   - Professional team photography session

3. **Content Writing**:
   - Write authentic "About" section
   - Document real project case studies
   - Gather actual metrics and results

4. **Technical Updates**:
   - Update metadata with production URLs
   - Replace placeholder text in components
   - Test all video file paths

---

**Document Version**: 1.0
**Last Updated**: 2025-09-30
**Contact**: Update as assets are gathered
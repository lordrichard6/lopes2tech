# Project Log: Lopes2Tech Website

> Context preservation for seamless chat handoffs.
> Each entry summarizes a work session for continuity.

---

## 2026-01-27 12:15 - Mobile Redesign, SEO Optimization & Blog Launch

### Summary
Comprehensive update to the website focusing on mobile UX, SEO ranking for new keywords ("AI workflows", "SEO development"), and performance. Launched a new "Insights" blog section with 10 initial articles.

### Decisions Made
- **Mobile First**: Moved "Client Portal" and "Language Selector" to the burger menu on mobile for better usability and cleaner header.
- **Glassmorphism Design**: Applied a premium "glass & neon" aesthetic to the mobile menu and service cards to match the brand identity.
- **Programmatic SEO Strategy**: Implemented a lightweight, JSON-based blog system (`/insights`) instead of a heavy CMS to keep the site fast ("10x faster" messaging).
- **Static Prerendering**: Configured Angular SSG for all blog posts causing build complexity but essential for SEO ranking.
- **WebP Conversion**: Converted all service images to WebP to improve load times.

### Key Changes
- **Mobile Menu**: Redesigned `.nav-menu` in `header.scss` with animations and glass effect.
- **Services Section**: Updated text in `i18n` files to highlight "AI-Powered" & "10x Faster".
- **Images**: Replaced PNGs with optimized WebP images in `assets/services/` and updated SCSS.
- **Blog Implementation**:
    - Created `src/assets/content/blog-posts.json` (Content DB)
    - Created `BlogService`
    - Created `InsightsListComponent` (`/insights`) & `BlogPostComponent` (`/insights/:slug`)
    - Added `nav.insights` to `header.html` and translations.
    - Configured `getPrerenderParams` in `app.routes.server.ts` for static generation.

### Current State
Working - All features deployed and verified locally via `npm run build`. SEO meta tags are dynamic.

### Next Steps
1. Monitor Google Search Console for "AI workflows" and "SEO development" rankings.
2. Consider adding an RSS feed or Sitemap update automation for new blog posts.
3. Validate "Client Portal" link tracking if needed.

### Notes
- **Prerendering**: If adding new blog posts to `blog-posts.json`, you MUST also update the hardcoded slugs in `src/app/app.routes.server.ts` for them to be prerendered.

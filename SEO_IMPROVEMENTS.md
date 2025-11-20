# SEO Improvements Plan

## Current State Analysis

### ✅ What's Already Good
- Basic meta tags (title, description, keywords)
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data (LocalBusiness)
- Sitemap.xml
- Robots.txt
- Hreflang tags for languages
- Geographic meta tags

### ❌ Issues Found
1. **Duplicate Twitter Card tags** (lines 39-43 and 45-49 in index.html)
2. **Static meta tags** - not dynamic per route
3. **Wrong email** in JSON-LD (info@lopes2tech.ch vs paulo@lopes2tech.ch)
4. **Missing pages** in sitemap (pricing, support-theraflow)
5. **No dynamic title service** for route-specific titles
6. **No meta tag service** for dynamic updates
7. **Missing structured data types:**
   - Organization schema
   - BreadcrumbList for navigation
   - WebSite schema with search action
8. **Missing hreflang URLs** for different routes
9. **Missing meta tags** for other pages

---

## 🎯 Priority Improvements

### 🔴 High Priority

#### 1. **Fix Duplicate Twitter Card Tags**
**Issue:** Two sets of Twitter Card meta tags in index.html
**Fix:** Remove duplicates, keep best version

#### 2. **Create SEO/Meta Tag Service**
**Why:** Dynamic meta tags per route improve SEO
**Implementation:** Service to update title, description, og tags per route

#### 3. **Fix JSON-LD Email**
**Issue:** Wrong email in structured data
**Fix:** Use correct email from constants

#### 4. **Update Sitemap**
**Missing Pages:**
- `/pricing`
- `/support-theraflow`

#### 5. **Implement Dynamic Titles**
**Why:** Route-specific titles improve CTR and SEO
**Implementation:** Title service integrated with router

---

### 🟡 Medium Priority

#### 6. **Enhanced Structured Data**
- Add Organization schema
- Add WebSite schema with search action
- Add BreadcrumbList schema
- Improve LocalBusiness schema

#### 7. **Route-Specific Meta Tags**
- Meta tags for each route (pricing, support-theraflow, impressum)
- Language-specific descriptions

#### 8. **Image Optimization**
- Add proper og:image for each route
- Use actual website images instead of favicon
- Optimize images for social sharing

---

### 🟢 Low Priority / Nice to Have

#### 9. **Performance SEO**
- Add preload hints for critical resources
- Optimize Core Web Vitals

#### 10. **Content Enhancements**
- Add FAQ schema if applicable
- Add Article schema for blog posts (if added)
- Add Review/Rating schema (if testimonials added)

---

## 📋 Implementation Plan

### Phase 1: Critical Fixes
1. Fix duplicate Twitter tags
2. Fix JSON-LD email
3. Update sitemap with missing pages

### Phase 2: Dynamic SEO
1. Create SEO service
2. Implement dynamic titles
3. Add route-specific meta tags

### Phase 3: Enhanced Structured Data
1. Add Organization schema
2. Add WebSite schema
3. Add BreadcrumbList schema

---

## 🔧 Files to Create/Modify

### New Files
- `src/app/services/seo.service.ts` - Dynamic meta tag management
- `src/app/interceptors/seo.interceptor.ts` - Auto-update meta on route change

### Files to Modify
- `src/index.html` - Fix duplicates, update JSON-LD
- `src/sitemap.xml` - Add missing pages
- Route components - Add route-specific SEO data

---

## 📊 Expected Impact

- **Search Visibility:** Improved with dynamic, route-specific meta tags
- **Social Sharing:** Better previews with optimized OG images
- **Click-Through Rate:** Higher with descriptive, route-specific titles
- **Rich Snippets:** Enhanced with additional structured data
- **International SEO:** Better with proper hreflang implementation


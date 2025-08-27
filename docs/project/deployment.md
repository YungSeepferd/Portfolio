# Deployment Guide

## GitHub Pages Deployment

### Automated Deployment

The project uses GitHub Actions for automated deployment to GitHub Pages with a custom domain.

**Workflow Configuration:** `.github/workflows/deploy.yml`

**Deployment Process:**
1. Triggers on push to main branch
2. Sets up Node.js 18 environment
3. Installs dependencies with `npm ci`
4. Builds production bundle with `npm run build`
5. Creates required GitHub Pages files:
   - `.nojekyll` (disables Jekyll processing)
   - `CNAME` (custom domain configuration)
6. Deploys to gh-pages branch using JamesIves/github-pages-deploy-action@v4

**Custom Domain:** `goekevincent.me`

### Manual Deployment

If needed, you can deploy manually:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages (if deploy script is configured)
npm run deploy
```

### Deployment Configuration

**Required Repository Settings:**
- GitHub Pages source: Deploy from a branch (gh-pages)
- Custom domain: goekevincent.me
- Enforce HTTPS: Enabled

**Required Secrets:**
- `DEPLOY_TOKEN`: Personal access token with repo permissions

### Build Optimization

**Production Build Features:**
- Code minification and bundling
- Asset optimization
- Source map generation
- Static file compression
- Cache busting with file hashes

**Performance Considerations:**
- Bundle size monitoring
- Lazy loading implementation
- Image optimization
- 3D asset optimization

### Deployment Checklist

Before deploying:
- [ ] Test build locally (`npm run build`)
- [ ] Verify all routes work correctly
- [ ] Check 3D background performance
- [ ] Test theme switching
- [ ] Validate responsive design
- [ ] Check accessibility compliance
- [ ] Verify all external links
- [ ] Test modal functionality

### Monitoring

**Post-Deployment Verification:**
- Site accessibility at goekevincent.me
- SSL certificate validity
- Performance metrics (Lighthouse)
- Cross-browser compatibility
- Mobile responsiveness

**Analytics Setup:**
- Google Analytics integration (when implemented)
- Core Web Vitals monitoring
- Error tracking setup

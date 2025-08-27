# Development Setup Guide

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Git**: Latest version
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebGL support

## Installation

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run deploy` - Deploy to GitHub Pages (requires proper setup)
- `npm test` - Run test suite (when implemented)

## Development Environment

### Required Extensions (VS Code)
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## Environment Variables

Create a `.env` file in the root directory (if needed):
```bash
# Example environment variables
REACT_APP_ANALYTICS_ID=your_analytics_id
REACT_APP_API_URL=your_api_url
```

## Troubleshooting

### Common Issues

**3D Background Not Loading:**
- Ensure WebGL is enabled in browser
- Check browser console for Three.js errors
- Fallback to CanvasBackground if needed

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node.js version compatibility

**Performance Issues:**
- Enable React DevTools Profiler
- Check for unnecessary re-renders
- Monitor bundle size with webpack-bundle-analyzer

### Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)
- **Edge**: Full support
- **Internet Explorer**: Not supported

## Development Workflow

1. Create feature branch from main
2. Make changes and test locally
3. Run linting and formatting
4. Commit with descriptive messages
5. Push and create pull request
6. Deploy automatically on merge to main

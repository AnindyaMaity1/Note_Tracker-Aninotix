# Aninotix 📝✨

**Capture Thoughts. Track Priorities.**  
A futuristic Progressive Web App (PWA) for lightning-fast note-taking with priority levels, color accents, and seamless local storage. Installable, offline-ready, and beautifully responsive.

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-6366f1?style=flat&logo=electron)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-No%20Framework-0f172a?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-fda4af?style=flat&logo=css3)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 🚀 Features

- **Instant Note Creation** - Title, details, priority (High/Medium/Low), and 5 color accents
- **Priority Filtering** - View All, High, Medium, or Low priority notes instantly
- **PWA Installable** - Add to home screen, works offline
- **Local Storage** - Persistent across sessions with automatic saving
- **Keyboard Shortcuts** - Meta/Ctrl + Enter to add notes
- **Glassmorphism Design** - Modern frosted glass cards with smooth animations
- **Fully Responsive** - Perfect on mobile, tablet, and desktop

## 🎨 Live Preview

```
Hero Header    Clear Board
┌──────────────┐ ┌──────────────┐
│ Title        │ │ Install App  │
│ Details      │ └──────────────┘
│ [Low ●] Add  │
└──────────────┘

Active Notes [All ▼]
┌─────────────┐ ┌─────────────┐
│ ● High      │ │ ● Medium    │
│ Project XYZ │ │ Grocery     │
│ Details...  │ │ List        │
└─────────────┘ └─────────────┘
```

## ⚡ Quick Start

1. **Download or Clone**
   ```bash
   git clone <your-repo-url>
   cd aninotix
   ```

2. **Open in Browser**
   ```bash
   # Just double-click index.html or use Live Server
   live-server .  # or any static server
   ```

3. **Install as PWA** (Recommended)
   - Click "Install App" button (appears on supported browsers)
   - Add to home screen for offline use

**No build step required!** Pure HTML/CSS/JS

## 📁 File Structure

```
aninotix/
├── index.html       # Main app structure + PWA manifest
├── styles.css       # Glassmorphism + futuristic gradients
├── script.js        # Core logic + localStorage + PWA
└── manifest.json    # PWA configuration (create if missing)
```

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Vanilla HTML5, CSS3, JavaScript ES6+ |
| **Storage** | localStorage (Browser) |
| **Design** | Glassmorphism, CSS Grid, Custom Properties |
| **PWA** | Service Worker ready, Manifest included |
| **Fonts** | Inter (Google Fonts) |

## 🎮 Usage

1. **Add Note**: Fill title/details, pick priority/color, click **Add Note** or **Ctrl+Enter**
2. **Filter**: Click priority buttons (All/High/Medium/Low)
3. **Delete**: Click × on any note card
4. **Clear All**: Use **Clear Board** button (irreversible)

**Pro Tip**: Install as PWA for desktop-like experience with offline support!

## 🔮 Customization

### Change Colors

Edit color swatches in `styles.css`:

```css
.swatch[data-color="#fda4af"] {
  --swatch-color: #fda4af;  /* Pink */
}
.swatch[data-color="#fcd34d"] {
  --swatch-color: #fcd34d;  /* Yellow */
}
```

### Modify Priority Levels

Update badge styles in `styles.css`:

```css
.badge[data-level="high"] {
  background: rgba(248, 113, 113, 0.15);
  color: #b91c1c;
}
```

### Adjust Storage Key

In `script.js`, change:

```javascript
const STORAGE_KEY = "note-tracker:notes";
```

### Design System

Tweak gradients and colors in `:root`:

```css
:root {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  color: #0f172a;
  background-color: #f4f6fb;
}
```

## 🌟 PWA Features

- **Install Prompt**: Auto-shows on supported browsers
- **Offline Ready**: Works without internet after install
- **Home Screen**: Full-screen app experience
- **Push Ready**: Service worker foundation included

### Create manifest.json

If missing, create `manifest.json`:

```json
{
  "name": "Aninotix - Note Tracker",
  "short_name": "Aninotix",
  "description": "Capture Thoughts. Track Priorities.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f4f6fb",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 📊 Data Structure

Notes are stored as JSON objects:

```javascript
{
  id: "uuid-string",
  title: "Project Kickoff",
  body: "Meeting at 2 PM with team",
  priority: "high",
  color: "#fda4af",
  createdAt: "2025-11-28T14:11:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push & open Pull Request

## 🐛 Troubleshooting

### Notes Not Saving?
- Check browser's localStorage is enabled
- Clear browser cache and reload
- Verify script.js is loading (check DevTools Console)

### Install Button Not Showing?
- Only appears on HTTPS (or localhost)
- Some browsers require criteria: valid manifest, service worker
- Check DevTools Application tab

### Performance Issues?
- Clear old notes using "Clear Board"
- Notes stored locally, no server lag
- Works best with 100-500 notes

## 📱 Browser Support

| Browser | Support | PWA Install |
|---------|---------|-------------|
| Chrome/Edge | ✅ Full | ✅ Yes |
| Firefox | ✅ Full | ⚠️ Limited |
| Safari | ✅ Full | ⚠️ iOS Only |

## 🚀 Deployment

Deploy to any static host:

- **Netlify**: Drag & drop folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push to `gh-pages` branch
- **Firebase Hosting**: `firebase deploy`

## 📚 Resources

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## 📄 License

MIT License - Feel free to use, modify, and distribute!

```
Copyright (c) 2025 Aninotix Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙌 Acknowledgments

- **Design Inspiration**: Glassmorphism, modern UI trends
- **Technology**: Vanilla JavaScript, CSS3 features
- **Community**: Open source contributors

---

**Made with ❤️ for productivity lovers**

Deploy instantly to: **Netlify** • **Vercel** • **GitHub Pages** 🚀

For issues & feature requests, open a GitHub issue or reach out!

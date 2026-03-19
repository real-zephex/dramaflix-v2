# Dramaflix - Modern Streaming Platform

A feature-rich streaming platform for movies and TV series built with Next.js 16, React 19, and TypeScript. Browse, search, and watch your favorite content with multi-source playback options and intelligent watch history tracking.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.1-06b6d4?style=flat-square&logo=tailwind-css)

## Features

✨ **Core Features**
- 🎬 **Movie & Series Catalog** - Browse thousands of movies and TV series with detailed information
- 🔍 **Global Search** - Lightning-fast search with Cmd+K shortcut across all content
- ▶️ **Multi-Source Streaming** - 3 redundant server options for maximum uptime and reliability
- 📺 **Advanced Video Player** - HLS streaming support with captions, progress tracking, and quality selection
- 📊 **Watch History** - Track watch status, resume playback, and manage your viewing history
- 🎨 **Responsive Design** - Perfect experience on mobile, tablet, and desktop
- 🌙 **Dark Mode** - Beautifully crafted dark theme by default
- ⌨️ **Keyboard Shortcuts** - System shortcuts for search and player controls

## Tech Stack

### Framework & Runtime
- **Next.js 16.1.6** - React framework with App Router, SSR, and SSG
- **React 19.2.4** - UI library with server and client components
- **TypeScript 5.9.3** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS 4.2.1** - Utility-first CSS framework

### Animation & Interaction
- **Framer Motion 12.34.3** - Production-ready motion library
- **react-hotkeys-hook 5.2.4** - Keyboard shortcuts (Cmd+K for search)
- **nextjs-toploader** - Page loading progress bar

### Data & API
- **TMDB API** - Primary source for movie and series metadata

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with navbar
│   ├── page.tsx                 # Home page with trending content
│   ├── error.tsx                # Error boundary handler
│   ├── globals.css              # Global styles
│   ├── movies/
│   │   ├── page.tsx            # Movies catalog
│   │   └── [id]/page.tsx       # Movie detail with player
│   ├── web-series/
│   │   ├── page.tsx            # Series catalog
│   │   ├── [id]/page.tsx       # Series detail with seasons
│   │   └── watch/[...slugs]/   # Episode player (S/E/ID)
│   └── watch-history/          # User's watch history
│
├── components/
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   ├── navbar.tsx           # Navigation bar
│   │   ├── hero-section.tsx     # Landing hero
│   │   ├── infinite-marquee.tsx # Scrolling content showcase
│   │   └── [other components]
│   │
│   ├── movies-ui/              # Movie-specific components
│   │   ├── movie-card.tsx
│   │   ├── movies-formatter.tsx
│   │   ├── movie-players.tsx    # Multi-source player
│   │   ├── movie-info-tabs.tsx
│   │   └── custom-video-player.tsx
│   │
│   ├── web-ui/                 # Series-specific components
│   │   ├── series-card.tsx
│   │   ├── season-cards.tsx
│   │   ├── custom-video-player.tsx # HLS player
│   │   ├── series-info-tabs.tsx
│   │   └── watch-status.tsx
│   │
│   ├── global-search.tsx        # Command palette search
│   └── fonts.tsx                # Font imports
│
├── lib/
│   └── utils.ts                 # Utility functions
│
└── utils/
    ├── types.ts                 # API response types
    ├── more-types.ts            # Additional types
    ├── http.ts                  # Fetch with retry logic
    ├── localStorage.ts          # Watch history storage
    ├── api-key-randomizer.ts   # TMDB API key rotation
    ├── movie-requests/
    │   └── request.ts           # TMDB movie API
    └── tv-requests/
        └── request.ts           # TMDB series API
```

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dramaflix.git
cd dramaflix
```

2. **Install dependencies**
```bash
bun install
# or
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
# TMDB API Keys (comma-separated for rotation)
TMDB_API_KEY=your_tmdb_api_key_1,your_tmdb_api_key_2

# Image proxy (optional)
NEXT_PUBLIC_PROXY=https://your-proxy.com

# HLS stream proxy (optional)
NEXT_PUBLIC_M3U8_PROXY=https://your-m3u8-proxy.com
```

**Get API Keys:**
- **TMDB API Key**: Sign up at [The Movie Database](https://www.themoviedb.org/settings/api) (free)

4. **Run the development server**
```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run ESLint
bun run lint
```

### Development Workflow

1. **Creating Pages** - Add new files in `src/app/` following Next.js App Router patterns
2. **Adding Components** - Create components in `src/components/` and import into pages
3. **Styling** - Use Tailwind CSS classes; custom theme in `tailwind.config.ts`
4. **Type Safety** - Define types in `src/utils/types.ts` for API responses

### Code Style

The project uses:
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript** - Type safety

Run linting before committing:
```bash
bun run lint
```

## Features Deep Dive

### 🎬 Movie & Series Browsing

- **Home Page**: Featured trending content with infinite scrolling marquees
- **Movie Catalog**: Browse by categories (trending, popular, top-rated, now playing)
- **Series Catalog**: Browse by categories (trending, popular, top-rated, airing today)
- **Detail Pages**: Full metadata including cast, crew, plot, ratings, and recommendations

### 🔍 Global Search

- **Cmd+K / Ctrl+K**: Open command palette search
- **Dual Provider**: Search both movies and series simultaneously
- **Instant Results**: Fast filtering with visual feedback
- **Deep Linking**: Go directly to detail or watch pages

### ▶️ Multi-Source Playback

**Movie and Series Players** (3 server options):
- Server 1: embedmaster.link
- Server 2: vidsrc.vip  
- Server 3: vidsrc.icu

### 📊 Watch History

**Features**:
- Track watch status (Watching, Completed, Plan to Watch, Dropped)
- Resume from last position
- Filter by type (Movie/Series)
- Quick status updates from detail pages
- Persistent storage using localStorage

### 🌙 Dark Mode

- Default dark theme with CSS custom properties
- Theme colors defined in `tailwind.config.ts`
- Seamless transitions

## Performance Optimizations

- **Server-Side Rendering**: Pages rendered on server for faster initial load
- **Image Optimization**: Next.js Image component with remote image patterns
- **API Caching**: Automatic revalidation (6 hour intervals)
- **Retry Logic**: Automatic retry with exponential backoff for failed requests
- **API Key Rotation**: Multiple API keys for better rate limit handling
- **Component Lazy Loading**: Skeleton loading states while content fetches
- **CSS Optimization**: Tailwind CSS purging unused classes


## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables (`.env.local`)
5. Deploy

```bash
# Or deploy via CLI
vercel
```

### Deploy to Other Platforms

The project can be deployed to any platform supporting Node.js:
- AWS Amplify
- Netlify
- Railway
- Render
- Docker

**Build command**: `bun run build`
**Start command**: `bun run start`
**Node version**: 18+

## Troubleshooting

### Issue: "API key quota exceeded"
- **Solution**: Add multiple TMDB API keys in `.env.local` (comma-separated)
- The app rotates keys automatically

### Issue: "Image not loading"
- **Solution**: Configure `NEXT_PUBLIC_PROXY` if accessing from blocked regions
- Add image domain in `next.config.mjs`

### Issue: "HLS stream not playing"
- **Solution**: Configure `NEXT_PUBLIC_M3U8_PROXY` if facing CORS issues
- Check browser console for specific errors

### Issue: "Watch history not persisting"
- **Solution**: Ensure localStorage is enabled in browser settings
- Check localStorage quota (typically 5-10MB per domain)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **TMDB (The Movie Database)** - Movie and series metadata
- **Consumet** - Streaming links and metadata
- **Next.js** - React framework
- **Radix UI** - Accessible UI components
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library

## Resources & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs)
- [TMDB API Docs](https://developer.themoviedb.org/3)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Create a discussion
- Check existing issues for solutions

---

**Made with ❤️ for streaming enthusiasts**

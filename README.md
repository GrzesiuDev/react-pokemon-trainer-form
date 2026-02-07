# Pokemon Trainer Registration Form

A Next.js application for registering new Pokemon trainers with their starter Pokemon. Built with TypeScript, featuring form validation, autocomplete search, and real-time Pokemon preview.

## 🚀 Features

- **Trainer Registration Form** with validation (name: 2-20 characters, age: 16-99)
- **Pokemon Autocomplete** with fuzzy search powered by Fuse.js
- **Real-time Pokemon Preview** fetched from PokeAPI
- **Server-side API Route** for Pokemon search with caching
- **Current Date Display** from external time API
- **Custom IBM VGA Font** for retro styling
- **Comprehensive Test Coverage** with Vitest
- **Responsive Design** with Tailwind CSS v3

## 📋 Requirements

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-trainer-form
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Mode

Build and run the production version:

```bash
npm run build
npm start
```

### 🐳 Docker (Recommended for Production)

#### Development with Docker (hot reload on port 3001):
```bash
docker-compose up app-dev
```

#### Production with Docker (optimized build on port 3000):
```bash
docker-compose up app-prod
```

**For detailed Docker documentation, see [DOCKER.md](./DOCKER.md)**

> **Note:** Docker uses Debian-based image (node:20-slim) for maximum compatibility with Tailwind CSS v3 and all npm packages. First build takes 5-10 minutes, subsequent builds are faster with caching. Uses `npm ci` for deterministic builds.

## 🧪 Testing

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Run tests with coverage report:
```bash
npm run test:coverage
```

### Test Coverage:
- API Routes (search endpoint)
- Utility functions
- Validation schemas
- UI Components (Button, FormInput, PokemonPreview)
- Form integration tests

See [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md) for detailed test documentation.

## 🏗️ Project Structure

```
pokemon-trainer-form/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── search/
│   │   │       └── route.ts          # Pokemon search API endpoint
│   │   ├── globals.css               # Global styles & IBM VGA font
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── forms/
│   │   │   ├── FormInput.tsx         # Reusable form input
│   │   │   ├── PokemonAutocomplete.tsx  # Autocomplete with dropdown
│   │   │   └── TrainerForm.tsx       # Main registration form
│   │   ├── modals/
│   │   │   └── SuccessModal.tsx      # Success confirmation modal
│   │   ├── pokemon/
│   │   │   └── PokemonPreview.tsx    # Pokemon details preview
│   │   └── ui/
│   │       ├── Button.tsx            # Reusable button component
│   │       ├── DateDisplay.tsx       # Current date display
│   │       └── PreviewContainer.tsx  # Preview wrapper
│   ├── constants/
│   │   └── messages.ts               # Centralized messages
│   ├── data/
│   │   └── pokemon.json              # Local Pokemon database
│   ├── hooks/
│   │   ├── useCurrentDate.ts         # Fetch current date
│   │   ├── usePokemonDetails.ts      # Fetch Pokemon details
│   │   └── usePokemonSearch.ts       # Search Pokemon via API
│   ├── lib/
│   │   ├── dateFormatter.ts          # Date formatting utilities
│   │   └── utils.ts                  # General utilities
│   ├── schemas/
│   │   └── trainerSchema.ts          # Yup validation schema
│   ├── services/
│   │   ├── dateApi.ts                # Time API integration
│   │   └── pokemonApi.ts             # PokeAPI integration
│   └── types/
│       └── pokemon.ts                # TypeScript type definitions
├── public/
│   └── fonts/
│       └── IBM_VGA.woff              # Custom font
├── vitest.config.ts                  # Vitest configuration
├── vitest.setup.ts                   # Test setup
└── package.json
```

## 🔧 Technology Stack

### Core
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS v3.4.17** - Utility-first CSS framework (stable version)
- **Custom CSS Variables** - Theme customization

### Form Management
- **Formik 2.4.6** - Form state management
- **Yup 1.6.1** - Schema validation

### Search & Data
- **Fuse.js 7.0.0** - Fuzzy search library
- **PokeAPI** - Pokemon data source
- **TimeAPI** - Current date/time source

### Testing
- **Vitest 2.1.8** - Test runner
- **React Testing Library 16.1.0** - Component testing
- **@testing-library/user-event 14.5.2** - User interaction simulation

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📝 API Endpoints

### `/api/search`

Search for Pokemon by name with fuzzy matching.

**Query Parameters:**
- `name` (optional) - Pokemon name to search for

**Response:**
```json
{
  "results": [
    {
      "id": 25,
      "name": "pikachu"
    }
  ]
}
```

**Features:**
- Fuzzy search with Fuse.js (threshold: 0.4)
- Returns all Pokemon when name is empty
- Limits results to 10 items
- Server-side caching (max 100 entries)
- Debounced on client-side (300ms)

## 🎨 Design Features

- **IBM VGA Font** - Retro monospace font for authentic feel
- **Custom Focus Ring** - Consistent focus states across inputs
- **Responsive Layout** - Mobile-first design
- **Loading States** - Skeleton screens and spinners
- **Error Handling** - User-friendly error messages
- **Success Modal** - Confirmation after form submission

## 🔍 Form Validation Rules

### Trainer Name
- Required
- Minimum 2 characters
- Maximum 20 characters

### Trainer Age
- Required
- Must be a number
- Minimum 16
- Maximum 99

### Pokemon Name
- Required
- Must select from autocomplete

## 🌐 External APIs

### PokeAPI
- **Base URL:** `https://pokeapi.co/api/v2`
- **Endpoint:** `/pokemon/{name}`
- **Purpose:** Fetch Pokemon details (sprites, types, stats)
- **Caching:** Client-side cache for fetched Pokemon

### TimeAPI
- **URL:** `https://timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw`
- **Purpose:** Display current date in Warsaw timezone
- **Fallback:** Local browser date if API fails

## 🐛 Known Issues & Limitations

- Pokemon search requires typing at least 1 character
- Date API fallback uses browser timezone if external API fails
- Form submission only logs to console (no backend integration)

## 🐳 Docker Support

This project includes full Docker support for both development and production environments.

### Quick Start with Docker:

**Development (with hot reload on port 3001):**
```bash
docker-compose up app-dev
```

**Production (optimized build on port 3000):**
```bash
docker-compose up app-prod
```

### Features:
- ✅ Multi-stage production build
- ✅ Development mode with hot reload
- ✅ Volume mounting for live code changes
- ✅ Debian-based image for lightningcss compatibility
- ✅ Optimized with npm ci and cache cleaning
- ✅ Image size ~200MB (Debian Slim)
- ✅ Non-root user for security
- ✅ Docker Compose orchestration
- ✅ Single command deployment

### Technical Details:
- **Base Image:** node:20-slim (Debian-based, optimized)
- **Why Debian?** Maximum compatibility with Tailwind CSS v3 and all npm packages
- **Build Time:** 5-10 minutes first time, ~1 minute with cache
- **Development Port:** 3001
- **Production Port:** 3000

**For detailed Docker documentation, see [DOCKER.md](./DOCKER.md)**

## 📄 License

This project was created as a recruitment task.

## 👨‍💻 Development Notes

### Code Quality
- SOLID principles applied
- DRY (Don't Repeat Yourself) enforced
- TypeScript strict mode enabled
- Comprehensive test coverage (>75%)

### Performance Optimizations
- API response caching
- Debounced search requests
- Lazy loading of Pokemon details
- Optimized re-renders with React hooks

### Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

This is a recruitment task project. For questions or issues, please contact the repository owner.

---

**Built with ❤️ using Next.js and TypeScript**

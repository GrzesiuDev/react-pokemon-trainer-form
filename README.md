# Pokemon Trainer Registration Form

Next.js application for registering Pokemon trainers with form validation, autocomplete, and Pokemon preview.

## Requirements

- Node.js 18+
- npm

## Installation

```bash
git clone <repository-url>
cd pokemon-trainer-form
npm install
```

## Running the Application

### Development
```bash
npm run dev
```
Application available at http://localhost:3000

### Production
```bash
npm run build
npm start
```

### Docker

**Development (port 3001, hot reload):**
```bash
docker-compose up app-dev
```

**Production (port 3000):**
```bash
docker-compose up app-prod
```

**Stop:**
```bash
docker-compose down
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Tech Stack

### Core
- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5

### Styling
- Tailwind CSS 3.4.17
- PostCSS + Autoprefixer

### Forms & Validation
- Formik 2.4.6
- Yup 1.6.1

### Search
- Fuse.js 7.0.0 (fuzzy search)

### Testing
- Vitest 2.1.8
- React Testing Library 16.1.0

### APIs
- PokeAPI - Pokemon data
- TimeAPI - current date

## Form Validation

- **Trainer name**: 2-20 characters
- **Trainer age**: 16-99 years
- **Pokemon name**: required (autocomplete)

## API Endpoints

### `/api/search`
Search Pokemon with fuzzy matching.

**Query params:**
- `name` (optional) - Pokemon name

**Response:**
```json
{
  "results": [
    { "id": 25, "name": "pikachu" }
  ]
}
```

**Features:**
- Fuzzy search (threshold: 0.4)
- Limit 10 results
- Server-side cache (max 100 entries)
- Client-side debounce (300ms)

## Project Structure

```
pokemon-trainer-form/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utility functions
│   ├── schemas/          # Yup validation schemas
│   ├── services/         # API services
│   └── types/            # TypeScript types
├── public/fonts/         # IBM VGA font
├── Dockerfile            # Production Docker
├── Dockerfile.dev        # Development Docker
└── docker-compose.yml    # Docker orchestration
```

## Docker

- **Base image**: node:20-slim
- **Development**: webpack with polling for hot reload
- **Production**: Turbopack, multi-stage build, standalone output
- **Image size**: ~200MB

## License

Created as a recruitment task.

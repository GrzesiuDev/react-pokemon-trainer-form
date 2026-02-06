# Test Documentation

## Test Setup

This project uses **Vitest** as the test runner and **React Testing Library** for component testing.

### Test Stack:

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **jsdom** - DOM implementation for Node.js

## Running Tests

### Run all tests once:

```bash
npm test
```

### Run tests in watch mode (during development):

```bash
npm run test:watch
```

### Run tests with coverage report:

```bash
npm run test:coverage
```

## Test Coverage

### API Routes

- **`src/app/api/search/route.test.ts`**
  - ✅ Returns all pokemon when name is empty
  - ✅ Returns filtered pokemon with fuzzy search
  - ✅ Limits results to 10 items
  - ✅ Handles non-existent pokemon
  - ✅ Returns correct data structure
  - ✅ Caches search results

### Utility Functions

- **`src/lib/utils.test.ts`**
  - ✅ `cn()` - className merging with Tailwind
  - ✅ `capitalize()` - string capitalization

- **`src/lib/dateFormatter.test.ts`**
  - ✅ `formatApiDate()` - API date formatting
  - ✅ `formatLocalDate()` - Local date formatting

### Validation

- **`src/schemas/trainerSchema.test.ts`**
  - ✅ Trainer name validation (2-20 characters)
  - ✅ Trainer age validation (16-99)
  - ✅ Pokemon name validation (required)
  - ✅ Edge cases for all fields

### Components

- **`src/components/ui/Button.test.tsx`**
  - ✅ Renders with children
  - ✅ Primary/secondary variants
  - ✅ Click handlers
  - ✅ Disabled state
  - ✅ Custom className
  - ✅ Type attribute

- **`src/components/forms/FormInput.test.tsx`**
  - ✅ Renders label and input
  - ✅ Handles value changes
  - ✅ Displays validation errors
  - ✅ Blur/focus events
  - ✅ Placeholder text
  - ✅ Number input type

- **`src/components/pokemon/PokemonPreview.test.tsx`**
  - ✅ Loading state
  - ✅ Error state
  - ✅ Empty state
  - ✅ Pokemon details display
  - ✅ Image rendering
  - ✅ Multiple types
  - ✅ Name capitalization

### Integration Tests

- **`src/components/forms/TrainerForm.test.tsx`**
  - ✅ Renders all form fields
  - ✅ Displays current date
  - ✅ Validation errors on submit
  - ✅ Form reset functionality
  - ✅ Success modal on valid submission
  - ✅ Pokemon preview integration

## Test Structure

```
src/
├── app/
│   └── api/
│       └── search/
│           ├── route.ts
│           └── route.test.ts
├── components/
│   ├── forms/
│   │   ├── FormInput.tsx
│   │   ├── FormInput.test.tsx
│   │   ├── TrainerForm.tsx
│   │   └── TrainerForm.test.tsx
│   ├── pokemon/
│   │   ├── PokemonPreview.tsx
│   │   └── PokemonPreview.test.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx
├── lib/
│   ├── utils.ts
│   ├── utils.test.ts
│   ├── dateFormatter.ts
│   └── dateFormatter.test.ts
└── schemas/
    ├── trainerSchema.ts
    └── trainerSchema.test.ts
```

## Continuous Integration

Tests should be run in CI/CD pipeline:

```bash
npm test -- --run --coverage
```

This ensures all tests pass before deployment.

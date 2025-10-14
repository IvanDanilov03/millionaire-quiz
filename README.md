<div align="center">

# Millionaire Quiz

Interactive implementation of the “Who Wants to Be a Millionaire?” quiz for the Headway Front-end test.

</div>

## Features

- 12-question flow with prize ladder that matches the provided Figma design
- Multi-answer questions supported (auto-evaluated on each selection)
- Responsive layout from iPhone 8 widths up to 4k displays without CSS frameworks
- Configurable game content driven by `questions.json`
- Accessible UI controls, keyboard support, and screen-reader friendly labels
- Strict TypeScript typing and lint rules (ESLint + Airbnb)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+ (or yarn/pnpm/bun if preferred)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:3000.

### Quality checks

```bash
npm run lint
npm run build
```

## Game configuration

All questions live in [`src/modules/Game/config/questions.json`](src/modules/Game/config/questions.json). Each entry supports:

- Arbitrary number of answers (min 4 recommended)
- One or multiple `isCorrect: true` answers
- Custom rewards per question

Updating the JSON file is enough to extend the quiz without touching the game logic.

## Deployment

Deploy to Vercel using the default Next.js workflow:

```bash
npm run build
vercel deploy
```

Any environment configuration (e.g., analytics) can be added via the Vercel project settings. No additional server setup is required.

## Tech stack

- [Next.js 15](https://nextjs.org/)
- TypeScript 5
- CSS Modules, no CSS frameworks
- ESLint + Airbnb config

## Project structure

```
src/
  modules/Game/
    components/         # Intro, Question, Result screens and UI pieces
    config/questions.json
    hooks/useGameEngine # core game state machine
    helpers/            # reusable helpers (assets, formatting)
    types/              # shared TypeScript models
  ui/                   # design system primitives (Button, IconButton, Drawer, etc.)
```

## License

MIT

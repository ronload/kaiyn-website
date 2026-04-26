# Kaiyn Website

Kaiyn Website is a multilingual marketing site for the Kaiyn crypto trading
community. It is built with Next.js App Router, React, next-intl, Tailwind CSS,
and reusable UI components.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- next-intl for routing and translations
- Tailwind CSS
- Biome for linting and formatting
- pnpm for package management

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the site:

- English: [http://localhost:3000](http://localhost:3000)
- Traditional Chinese: [http://localhost:3000/zh-TW](http://localhost:3000/zh-TW)
- Simplified Chinese: [http://localhost:3000/zh-CN](http://localhost:3000/zh-CN)

## Scripts

```bash
pnpm dev           # Start the local development server
pnpm build         # Create a production build
pnpm start         # Start the production server
pnpm typecheck     # Run TypeScript checks
pnpm lint          # Run Biome checks
pnpm format        # Format files with Biome
pnpm check         # Run typecheck, Biome check, and format check
pnpm clean         # Remove generated build/cache files
pnpm clean:all     # Remove generated files, reinstall dependencies
```

## Project Structure

```text
src/app/[locale]/
  layout.tsx                 Locale-aware root layout
  (home)/page.tsx            Home page composition
  (home)/_components/        Home page sections and feature components

src/components/
  layout/                    Shared layout components
  ui/                        Reusable UI primitives
  custom/                    Project-specific shared components

src/i18n/
  routing.ts                 Supported locales and locale prefix rules
  request.ts                 next-intl request configuration
  navigation.ts              Locale-aware navigation helpers

messages/
  en.json                    English copy
  zh-TW.json                 Traditional Chinese copy
  zh-CN.json                 Simplified Chinese copy

public/
  img/                       Static image assets
  video/                     Static video assets
```

## Internationalization

Supported locales are configured in `src/i18n/routing.ts`:

- `en` is the default locale and uses the root path.
- `zh-TW` uses `/zh-TW`.
- `zh-CN` uses `/zh-CN`.

Page copy lives in the matching files under `messages/`. When adding or
renaming a translation key, update every locale file so all language routes stay
in sync.

## Home Page Flow

The home page is assembled in `src/app/[locale]/(home)/page.tsx` from these
sections:

1. Hero
2. Exchange logos marquee
3. Feature cards
4. Timeline

Most visible text comes from the `HomePage` namespace in the translation files.
This makes small copy changes a good first task because they exercise the
project's i18n flow without touching complex application logic.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` (or `pnpm dev:host` for network access)
- **Build**: `pnpm build` (includes typecheck)
- **Type checking**: `pnpm typecheck`
- **Linting**: `pnpm lint` (check) or `pnpm lint:fix` (fix and format)
- **Formatting**: `pnpm format`
- **Preview build**: `pnpm preview`

## Project Architecture

This is a React + TypeScript + Vite project that has been migrated from Chakra UI to shadcn/ui with Tailwind CSS.

### Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Rolldown (via `rolldown-vite`)
- **Styling**: Tailwind CSS 4.x with shadcn/ui components
- **Package Manager**: pnpm
- **React Compiler**: Enabled via `babel-plugin-react-compiler`

### Key Architecture Details

- **Import Aliases**: The project uses `@/` as an alias for the `src/` directory
- **Components**: Located in `src/components/ui/` (shadcn/ui components) and `src/components/`
- **Utilities**: Shared utilities in `src/lib/utils.ts` including the `cn()` function for class merging
- **shadcn/ui Configuration**: Uses "new-york" style with CSS variables, configured in `components.json`
- **Icons**: Uses `react-icons` and `lucide-react`

### Project Structure
```
src/
├── App.tsx          # Main application component (personal portfolio)
├── main.tsx         # Application entry point
├── index.css        # Global styles with Tailwind
├── components/
│   └── ui/          # shadcn/ui components
├── lib/
│   └── utils.ts     # Utility functions (cn, etc.)
└── assets/          # Static assets
```

### Current State
The project appears to be a personal portfolio website for Stephen Titcombe, currently showing a simple landing page with social media links. The codebase is in the middle of a migration from Chakra UI to shadcn/ui, as evidenced by the git status showing many deleted files and the current branch name `feat/shadcn-tailwind-migration`.

### Development Notes
- Always run `pnpm typecheck` before building
- Use the `cn()` utility function for conditional class names
- Follow shadcn/ui patterns for component development
- The build process includes type checking as a prerequisite
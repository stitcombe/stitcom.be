# stitcom.be

> A modern, minimalist personal portfolio website built with React 19, TypeScript, and shadcn/ui.

## ✨ Overview

This is the personal portfolio website for Stephen Titcombe, featuring a clean and responsive design with social media links and modern web technologies.

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Rolldown (via `rolldown-vite`)
- **Styling**: Tailwind CSS 4.x with shadcn/ui components
- **Package Manager**: pnpm
- **React Compiler**: Enabled via `babel-plugin-react-compiler`
- **Icons**: Lucide React and React Icons
- **UI Components**: shadcn/ui with "new-york" style

## 📁 Project Structure

```text
src/
├── App.tsx          # Main application component (personal portfolio)
├── main.tsx         # Application entry point
├── index.css        # Global styles with Tailwind
├── components/
│   └── ui/          # shadcn/ui components (Button, Tooltip)
├── lib/
│   └── utils.ts     # Utility functions (cn, etc.)
└── assets/          # Static assets (memoji.png)
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (configured as package manager)

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start development server with network access
pnpm dev:host
```

### Available Scripts

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | Start development server                     |
| `pnpm dev:host`  | Start development server with network access |
| `pnpm build`     | Build for production (includes typecheck)    |
| `pnpm preview`   | Preview production build                     |
| `pnpm typecheck` | Run TypeScript type checking                 |
| `pnpm lint`      | Run ESLint (check only)                      |
| `pnpm lint:fix`  | Run ESLint with auto-fix and format          |
| `pnpm format`    | Format code with Prettier                    |

### Development Workflow

1. **Before building**: Always run `pnpm typecheck`
2. **Code quality**: Use `pnpm lint:fix` for linting and formatting
3. **Type safety**: TypeScript is strictly enforced

## 🏗️ Architecture

### Key Features

- **Import Aliases**: Uses `@/` as alias for `src/` directory
- **Component System**: Built on shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4.x with CSS variables
- **Type Safety**: Full TypeScript coverage
- **Modern React**: React 19 with experimental compiler support

### shadcn/ui Configuration

The project uses shadcn/ui with the following configuration:

- Style: "new-york"
- Base color: "neutral"
- CSS variables enabled
- Components path: `@/components/ui`

### Utilities

- `cn()` function in `src/lib/utils.ts` for conditional class names
- Tailwind merge for efficient class combining
- Class variance authority for component variants

## 🌐 Deployment

The project builds to a `dist/` directory and can be deployed to any static hosting service.

```bash
# Build for production
pnpm build

# Preview the build locally
pnpm preview
```

## 📋 Dependencies

### Production

- React 19 ecosystem (react, react-dom)
- Radix UI primitives (@radix-ui/react-\*)
- Tailwind CSS 4.x with Vite plugin
- Class utilities (clsx, tailwind-merge, class-variance-authority)
- Icons (lucide-react, react-icons)

### Development

- Vite with Rolldown for fast builds
- TypeScript 5.9 with strict configuration
- ESLint 9 with React hooks plugin
- Prettier for code formatting
- Babel React Compiler plugin

## 🎨 Customization

### Adding Components

Use shadcn/ui CLI to add new components:

```bash
npx shadcn@latest add [component-name]
```

### Styling

The project uses Tailwind CSS with a custom configuration. Global styles are in `src/index.css`.

### Icons

The project supports both Lucide React and React Icons:

- Lucide React: Primary icon library for shadcn/ui
- React Icons: Additional icon sets (currently using VscGithubInverted, FaLinkedin, FaThreads)

## 📄 License

This project is private and not intended for redistribution.

---

Built with ❤️ by Stephen Titcombe

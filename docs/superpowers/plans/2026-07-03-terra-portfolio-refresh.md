# Terra-Style Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild stitcom.be as a lean terra-style one-page portfolio: sticky header, dark typography hero, light projects grid with a details modal, employer-logo marquee ticker, dark footer.

**Architecture:** `App.tsx` becomes a thin composition of five section components in `src/components/sections/`, driven by typed data arrays in `src/data/`. Terra design tokens go into `src/index.css` via Tailwind 4 `@theme`. Animation is a single IntersectionObserver hook plus CSS keyframes — no animation library.

**Tech Stack:** React 19, TypeScript, Vite (rolldown), Tailwind CSS 4, shadcn/ui (Button exists; Dialog added in Task 4), react-icons.

**Spec:** `docs/superpowers/specs/2026-07-03-terra-portfolio-refresh-design.md`

## Global Constraints

- Palette: near-black `#0F0F0F` (`ink`) and near-white `#FEFEFE` (`paper`) only; borders at 15% opacity of the opposing color; no accent color.
- Typography: DM Sans 400/700 via Google Fonts; all headings lowercase; display H1 `clamp(4rem, 12vw, 9.5rem)`; section H2 `clamp(2.5rem, 5vw, 4rem)`.
- Buttons/CTAs: pill shape (`rounded-full`), 2px border, background/foreground swap on hover.
- All external links: `target="_blank" rel="noopener noreferrer"`.
- Both reveal animations and the ticker must respect `prefers-reduced-motion: reduce`.
- Only new dependency allowed: `@radix-ui/react-dialog` (pulled in by the shadcn Dialog component).
- Repo has no test framework and this plan does not add one (per spec). Every task's test cycle is: `pnpm typecheck` + `pnpm lint` + a stated visual check in `pnpm dev` (http://localhost:5173).
- LinkedIn URL: `https://www.linkedin.com/in/stephentitcombe/`. GitHub: `https://github.com/stitcombe`. Threads: `https://www.threads.net/@spault`.

---

### Task 1: Design tokens, fonts, and the cilantno asset

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`
- Create: `src/assets/cilantno.png` (copied from image cache)

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind utilities `bg-ink`, `bg-paper`, `text-ink`, `text-paper`, `border-ink/15`, `border-paper/15` (via `@theme` colors `--color-ink` / `--color-paper`); DM Sans as the site-wide default sans font; CSS behaviors `[data-reveal]`/`.is-visible` and `.ticker-track`; asset `src/assets/cilantno.png`.

- [ ] **Step 1: Copy the cilantno screenshot into assets**

```bash
cp /Users/stitcombe/.claude/image-cache/8dbdc9e1-6d0b-4c1a-82ac-a2110ecfece5/1.png /Users/stitcombe/git/gh_stitcombe/stitcom.be/src/assets/cilantno.png
```

Verify: `file src/assets/cilantno.png` reports `PNG image data, 2000 x 1170`.

- [ ] **Step 2: Add DM Sans to `index.html`**

Add these three lines inside `<head>`, after the `<title>` element:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
```

- [ ] **Step 3: Add terra tokens and animation CSS to `src/index.css`**

Append the following at the end of the file (after the existing `@layer base` block). Do not modify the existing shadcn variables.

```css
/* ---- terra design tokens ---- */
@theme {
  --color-ink: #0f0f0f;
  --color-paper: #fefefe;
  --font-sans: 'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif;
}

/* ---- scroll reveal ---- */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }
  [data-reveal].is-visible {
    opacity: 1;
    transform: none;
  }
}

/* ---- marquee ticker ---- */
@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.ticker-track {
  animation: ticker-scroll 30s linear infinite;
}
.ticker-track:hover {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
```

Note: overriding `--font-sans` in `@theme` changes Tailwind 4's default document font, so the whole site renders in DM Sans with no per-element classes needed.

- [ ] **Step 4: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: both pass with no output/errors.

Run: `pnpm dev`, open http://localhost:5173.
Expected: the existing landing page renders in DM Sans (visibly rounder than the previous system font). No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html src/index.css src/assets/cilantno.png
git commit -m "feat: add terra design tokens, DM Sans, and cilantno asset

Claude-Session: https://claude.ai/code/session_01AeBFqQvJABCRraxXToKSos"
```

---

### Task 2: Data files and the reveal hook

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/socials.ts`
- Create: `src/hooks/useReveal.ts`

**Interfaces:**
- Consumes: `src/assets/cilantno.png` (Task 1).
- Produces:
  - `projects.ts`: `interface Project { title: string; description: string; details: string; href: string; image: string; tech?: string[]; role?: string }`, `interface PlaceholderProject { comingSoon: true }`, `type PortfolioEntry = Project | PlaceholderProject`, `function isPlaceholder(entry: PortfolioEntry): entry is PlaceholderProject`, `const portfolio: PortfolioEntry[]` (cilantno + 2 placeholders).
  - `socials.ts`: `interface SocialLink { label: string; href: string; icon: IconType }`, `const socialLinks: SocialLink[]`, `const linkedInUrl: string`.
  - `useReveal.ts`: `function useReveal(): void` — call once in `App`; observes all `[data-reveal]` elements and adds `is-visible` on first intersection.

- [ ] **Step 1: Create `src/data/projects.ts`**

```typescript
import cilantnoImage from '@/assets/cilantno.png';

export interface Project {
  title: string;
  description: string;
  details: string;
  href: string;
  image: string;
  tech?: string[];
  role?: string;
}

export interface PlaceholderProject {
  comingSoon: true;
}

export type PortfolioEntry = Project | PlaceholderProject;

export function isPlaceholder(
  entry: PortfolioEntry
): entry is PlaceholderProject {
  return 'comingSoon' in entry;
}

export const portfolio: PortfolioEntry[] = [
  {
    title: 'cilantno',
    description:
      'a game about picking the cilantro out of your salad. inspired by a colleague’s daily lunch ritual.',
    details:
      'a colleague of mine had a daily lunch ritual: order a salad, then spend the first few minutes of lunch picking every last piece of cilantro out of it. cilantno turns that ritual into a game — race the clock to pull the cilantro from the bowl without grabbing the good stuff.',
    href: 'https://cilantno.loon.sh',
    image: cilantnoImage,
  },
  { comingSoon: true },
  { comingSoon: true },
];
```

- [ ] **Step 2: Create `src/data/socials.ts`**

```typescript
import type { IconType } from 'react-icons';
import { VscGithubInverted } from 'react-icons/vsc';
import { FaLinkedin, FaThreads } from 'react-icons/fa6';

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export const linkedInUrl = 'https://www.linkedin.com/in/stephentitcombe/';

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/stitcombe',
    icon: VscGithubInverted,
  },
  {
    label: 'LinkedIn',
    href: linkedInUrl,
    icon: FaLinkedin,
  },
  {
    label: 'Threads',
    href: 'https://www.threads.net/@spault',
    icon: FaThreads,
  },
];
```

- [ ] **Step 3: Create `src/hooks/useReveal.ts`**

```typescript
import { useEffect } from 'react';

/**
 * Adds `is-visible` to every `[data-reveal]` element the first time it
 * enters the viewport. CSS in index.css handles the transition; under
 * prefers-reduced-motion the elements are simply always visible.
 */
export function useReveal(): void {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document
      .querySelectorAll('[data-reveal]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
```

- [ ] **Step 4: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: both pass. (Nothing imports these yet; that's fine — `tsc -b` still type-checks them.)

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/data/socials.ts src/hooks/useReveal.ts
git commit -m "feat: add portfolio/social data and useReveal hook

Claude-Session: https://claude.ai/code/session_01AeBFqQvJABCRraxXToKSos"
```

---

### Task 3: Header, hero, and the new App shell

**Files:**
- Create: `src/components/sections/SiteHeader.tsx`
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/App.tsx` (full rewrite)

**Interfaces:**
- Consumes: `linkedInUrl` (Task 2), `useReveal` (Task 2), `Button` from `@/components/ui/button`, `src/assets/memoji.png`.
- Produces: `SiteHeader` (no props), `Hero` (no props); `App.tsx` composition pattern that Tasks 4–6 extend by inserting `<Projects />`, `<Ticker />`, `<SiteFooter />`.

- [ ] **Step 1: Create `src/components/sections/SiteHeader.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import memoji from '@/assets/memoji.png';
import { Button } from '@/components/ui/button';
import { linkedInUrl } from '@/data/socials';

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/90 px-6 py-3 backdrop-blur transition-transform duration-300 md:px-12 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <a href="#top" aria-label="Back to top">
        <img src={memoji} alt="Stephen Titcombe memoji" className="h-10" />
      </a>
      <Button
        asChild
        className="rounded-full border-2 border-paper bg-paper text-base font-bold text-ink hover:bg-transparent hover:text-paper"
      >
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
          let&apos;s talk!
        </a>
      </Button>
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Hero.tsx`**

```tsx
export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center bg-ink px-6 pt-24 text-paper md:px-12"
    >
      <h1
        data-reveal
        className="max-w-[12ch] text-[clamp(4rem,12vw,9.5rem)] font-bold leading-[1.1]"
      >
        hi, i&apos;m stephen.
      </h1>
      <p
        data-reveal
        className="mt-8 max-w-2xl text-xl leading-relaxed text-paper/80"
      >
        product manager. i build things worth using — and occasionally things
        worth playing.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `src/App.tsx`**

Replace the entire file contents with:

```tsx
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { useReveal } from '@/hooks/useReveal';

function App() {
  useReveal();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </>
  );
}

export default App;
```

Note: this removes the old Tooltip/social-button hero. `src/components/ui/tooltip.tsx` becomes unused and intentionally stays (per spec). The social links return in Task 6's footer.

- [ ] **Step 4: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: both pass.

Visual check at http://localhost:5173:
- Full-viewport near-black hero with the oversized lowercase headline; headline and subline fade/slide in on load.
- Header: memoji left, "let's talk!" pill right; pill inverts (transparent bg, light text) on hover.
- Scroll down (page may need a taller viewport — shrink the window height if the hero fits entirely): header slides up out of view; scroll up: it returns.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/SiteHeader.tsx src/components/sections/Hero.tsx src/App.tsx
git commit -m "feat: terra hero and sticky header, new App composition

Claude-Session: https://claude.ai/code/session_01AeBFqQvJABCRraxXToKSos"
```

---

### Task 4: Projects grid and details modal

**Files:**
- Create: `src/components/ui/dialog.tsx` (via shadcn CLI)
- Create: `src/components/sections/Projects.tsx`
- Create: `src/components/sections/ProjectDialog.tsx`
- Modify: `src/App.tsx` (insert `<Projects />`)
- Modify: `package.json` / `pnpm-lock.yaml` (CLI adds `@radix-ui/react-dialog`)

**Interfaces:**
- Consumes: `portfolio`, `isPlaceholder`, `Project` type (Task 2); shadcn `Dialog` primitives; `Button`.
- Produces: `Projects` (no props — owns `selected` state); `ProjectDialog({ project: Project | null; onClose: () => void })`.

- [ ] **Step 1: Add the shadcn Dialog component**

```bash
pnpm dlx shadcn@latest add dialog
```

Expected: creates `src/components/ui/dialog.tsx` and adds `@radix-ui/react-dialog` to dependencies. If the CLI asks to overwrite existing files, answer no to everything except creating `dialog.tsx`.

- [ ] **Step 2: Create `src/components/sections/ProjectDialog.tsx`**

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/projects';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  return (
    <Dialog
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto border-ink/15 bg-paper text-ink sm:max-w-2xl">
        {project && (
          <>
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full rounded-md"
            />
            <DialogHeader className="text-left">
              <DialogTitle className="text-3xl font-bold lowercase">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-ink/70">
                {project.details}
              </DialogDescription>
            </DialogHeader>
            {project.tech && (
              <p className="text-sm text-ink/60">
                built with: {project.tech.join(', ')}
              </p>
            )}
            {project.role && (
              <p className="text-sm text-ink/60">role: {project.role}</p>
            )}
            <Button
              asChild
              className="w-fit rounded-full border-2 border-ink bg-ink text-base font-bold text-paper hover:bg-transparent hover:text-ink"
            >
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                visit site →
              </a>
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/Projects.tsx`**

```tsx
import { useState } from 'react';
import { isPlaceholder, portfolio, type Project } from '@/data/projects';
import { ProjectDialog } from './ProjectDialog';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section className="bg-paper px-6 py-30 text-ink md:px-12">
      <h2
        data-reveal
        className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight"
      >
        selected work
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {portfolio.map((entry, i) =>
          isPlaceholder(entry) ? (
            <div
              key={`placeholder-${i}`}
              data-reveal
              className="flex aspect-[4/3] items-center justify-center rounded-lg bg-ink/5 text-lg font-bold text-ink/40"
            >
              coming soon
            </div>
          ) : (
            <button
              key={entry.title}
              type="button"
              data-reveal
              onClick={() => setSelected(entry)}
              className="group cursor-pointer overflow-hidden rounded-lg border border-ink/15 text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={entry.image}
                  alt={`${entry.title} screenshot`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{entry.title}</h3>
                <p className="mt-2 text-ink/70">{entry.description}</p>
              </div>
            </button>
          )
        )}
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
```

- [ ] **Step 4: Insert `<Projects />` into `src/App.tsx`**

Add the import and place it after `<Hero />`:

```tsx
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { useReveal } from '@/hooks/useReveal';

function App() {
  useReveal();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
      </main>
    </>
  );
}

export default App;
```

- [ ] **Step 5: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: both pass.

Visual check at http://localhost:5173:
- Light section below the hero: "selected work" heading, 3 cards on desktop (cilantno + two muted "coming soon" tiles), 1 column below 768px.
- Cards reveal on scroll (stagger not required; each fades in as it enters).
- Clicking cilantno opens the modal: screenshot, lowercase title, details paragraph, "visit site →" pill (no "built with"/"role" lines since those fields are unset).
- Modal closes via ✕ button, Esc, and overlay click; page behind doesn't scroll while open; "coming soon" tiles do nothing on click.
- "visit site →" opens https://cilantno.loon.sh in a new tab.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/dialog.tsx src/components/sections/Projects.tsx src/components/sections/ProjectDialog.tsx src/App.tsx package.json pnpm-lock.yaml
git commit -m "feat: projects grid with details modal

Claude-Session: https://claude.ai/code/session_01AeBFqQvJABCRraxXToKSos"
```

---

### Task 5: Employer logos and ticker

**Files:**
- Create: `src/assets/logos/` (up to 5 files, see Step 1)
- Create: `src/data/employers.ts`
- Create: `src/components/sections/Ticker.tsx`
- Modify: `src/App.tsx` (insert `<Ticker />`)

**Interfaces:**
- Consumes: `.ticker-track` CSS (Task 1).
- Produces: `employers.ts`: `interface Employer { name: string; logo?: string }`, `const employers: Employer[]` (5 entries); `Ticker` (no props).

- [ ] **Step 1: Source the five employer logos**

Target files (SVG strongly preferred; PNG acceptable):

| Company | File |
|---|---|
| Abarca Health | `src/assets/logos/abarca-health.svg` |
| Prime Therapeutics | `src/assets/logos/prime-therapeutics.svg` |
| Travelers Insurance | `src/assets/logos/travelers.svg` |
| LPL Financial | `src/assets/logos/lpl-financial.svg` |
| Thrivent Financial | `src/assets/logos/thrivent.svg` |

Procedure per company, in order of preference:
1. Wikimedia Commons: search `https://commons.wikimedia.org/w/index.php?search=<company>+logo` for an SVG file page, then download the original file.
2. The company's own brand/press/newsroom page.
3. The `og:image` or header logo asset on the company's homepage (inspect HTML).

Download with curl, e.g.:

```bash
curl -L -o src/assets/logos/travelers.svg '<direct-file-url>'
```

After each download, verify it's actually an image (`file src/assets/logos/travelers.svg` → `SVG Scalable Vector Graphics image` or PNG; an HTML error page means the URL was wrong). Any color is fine — the ticker renders all logos monochrome white via CSS `brightness-0 invert`.

**Fallback (per spec):** if no usable asset is found for a company after trying all three sources, skip the file and omit the `logo` field in Step 2 — the ticker renders that company as a text wordmark instead. Do not block on a missing logo.

- [ ] **Step 2: Create `src/data/employers.ts`**

Include a `logo` import only for files that exist. Assuming all five were found:

```typescript
import abarcaLogo from '@/assets/logos/abarca-health.svg';
import primeLogo from '@/assets/logos/prime-therapeutics.svg';
import travelersLogo from '@/assets/logos/travelers.svg';
import lplLogo from '@/assets/logos/lpl-financial.svg';
import thriventLogo from '@/assets/logos/thrivent.svg';

export interface Employer {
  name: string;
  /** Omitted → the ticker renders the name as a text wordmark. */
  logo?: string;
}

export const employers: Employer[] = [
  { name: 'Abarca Health', logo: abarcaLogo },
  { name: 'Prime Therapeutics', logo: primeLogo },
  { name: 'Travelers Insurance', logo: travelersLogo },
  { name: 'LPL Financial', logo: lplLogo },
  { name: 'Thrivent Financial', logo: thriventLogo },
];
```

For any missing logo, drop that import and its `logo:` property (e.g., `{ name: 'Abarca Health' }`).

- [ ] **Step 3: Create `src/components/sections/Ticker.tsx`**

```tsx
import { employers } from '@/data/employers';

export function Ticker() {
  return (
    <section className="overflow-hidden bg-ink py-16 text-paper">
      <p className="px-6 text-sm text-paper/60 md:px-12">
        places i&apos;ve worked
      </p>
      <div className="mt-8 overflow-hidden whitespace-nowrap">
        <div className="ticker-track inline-flex items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="inline-flex items-center"
              aria-hidden={copy === 1}
            >
              {employers.map((employer) => (
                <span
                  key={employer.name}
                  className="inline-flex items-center gap-16 pl-16"
                >
                  {employer.logo ? (
                    <img
                      src={employer.logo}
                      alt={employer.name}
                      className="h-9 w-auto brightness-0 invert"
                    />
                  ) : (
                    <span className="text-2xl font-bold">
                      {employer.name.toLowerCase()}
                    </span>
                  )}
                  <span aria-hidden="true" className="text-paper/40">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

The track holds two identical copies of the employer row; the `-50%` keyframe translate (Task 1 CSS) makes the loop seamless. The second copy is `aria-hidden` so screen readers hear each employer once.

- [ ] **Step 4: Insert `<Ticker />` into `src/App.tsx`** after `<Projects />`:

```tsx
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Ticker } from '@/components/sections/Ticker';
import { useReveal } from '@/hooks/useReveal';

function App() {
  useReveal();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Ticker />
      </main>
    </>
  );
}

export default App;
```

- [ ] **Step 5: Verify**

Run: `pnpm typecheck && pnpm lint`
Expected: both pass.

Visual check at http://localhost:5173:
- Dark band below the projects grid with "places i've worked" caption.
- Logos scroll right-to-left continuously, all rendered white at uniform ~36px height, ✦ between each; loop has no visible jump when it wraps.
- Hovering the track pauses it.
- With reduced motion enabled (macOS: System Settings → Accessibility → Display → Reduce motion, or DevTools rendering emulation), the track is static and the first five entries are readable.

- [ ] **Step 6: Commit**

```bash
git add src/assets/logos src/data/employers.ts src/components/sections/Ticker.tsx src/App.tsx
git commit -m "feat: employer logo marquee ticker

Claude-Session: https://claude.ai/code/session_01AeBFqQvJABCRraxXToKSos"
```

---

### Task 6: Footer and final verification

**Files:**
- Create: `src/components/sections/SiteFooter.tsx`
- Modify: `src/App.tsx` (insert `<SiteFooter />`)

**Interfaces:**
- Consumes: `socialLinks` (Task 2).
- Produces: `SiteFooter` (no props); the completed page.

- [ ] **Step 1: Create `src/components/sections/SiteFooter.tsx`**

```tsx
import { socialLinks } from '@/data/socials';

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/15 bg-ink px-6 py-16 text-paper md:px-12">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <p className="text-2xl font-bold">stephen titcombe</p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex size-12 items-center justify-center rounded-full border-2 border-paper text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <link.icon className="size-6" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-12 text-sm text-paper/60">
        © {new Date().getFullYear()} stephen titcombe
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Insert `<SiteFooter />` into `src/App.tsx`** after `</main>`:

```tsx
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Ticker } from '@/components/sections/Ticker';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { useReveal } from '@/hooks/useReveal';

function App() {
  useReveal();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Ticker />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
```

- [ ] **Step 3: Full verification pass (spec "Definition of done")**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: all pass; build emits `dist/` without warnings about missing assets.

Visual checklist at http://localhost:5173 (desktop width and a ~375px mobile viewport):
- Section rhythm: dark hero → light projects → dark ticker → dark footer with a visible top border.
- Footer: name, three circular social buttons (GitHub, LinkedIn, Threads) that invert on hover and open in new tabs, copyright line.
- Header hide/show still works across the full page height.
- Reveal animations fire once per element, never re-trigger on scroll-back.
- Reduced-motion emulation: everything visible immediately, ticker static.
- Modal open/close cycle still works after full composition.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/SiteFooter.tsx src/App.tsx
git commit -m "feat: terra footer, complete portfolio page

Claude-Session: https://claude.ai/code/session_01AeBFqQvJABCRraxXToKSos"
```

# Terra-Style Portfolio Refresh — Design

**Date:** 2026-07-03
**Branch:** feat/reimagine
**Status:** Approved

## Purpose

Refresh stitcom.be — Stephen Titcombe's personal Product Management portfolio — from a single-hero landing page into a lean, terra-style (terrahq.com-inspired) one-page portfolio: editorial typography, dark/light alternating sections, and a projects grid that can grow over time.

## Scope

A single-page site with five parts: sticky header, dark hero, light projects grid, marquee ticker, dark footer. One real project (cilantno) plus two placeholder cards. No routing, no CMS, no test framework, no analytics changes.

Out of scope: dedicated project pages/routes (details display in a modal instead), long-form case-study write-ups, an about/services section, testimonials, a contact form.

## Page Design

### Header (sticky)
- Memoji (existing `src/assets/memoji.png`) at small size as the logo mark, left-aligned.
- Right side: pill button "let's talk!" linking to LinkedIn (https://www.linkedin.com/in/stephentitcombe/).
- Hides on scroll down, reappears on scroll up (translateY transition).
- No nav menu.

### Hero (dark, full viewport)
- Background `#0F0F0F`, text `#FEFEFE`.
- Oversized lowercase display headline, `clamp(4rem, 12vw, 9.5rem)`, DM Sans 700, line-height ~1.1.
- Copy direction (owner may rewrite): "hi there, i'm stephen." with subline "a full-stack product manager. i build things worth using — and occasionally things worth playing."

### Projects (light)
- Background `#FEFEFE`. Section heading "selected work" (lowercase, clamp(2.5rem, 5vw, 4rem)).
- 3-column CSS grid on desktop, 1 column on mobile.
- Card 1 — **cilantno**: screenshot image, title, one-liner: "a game about picking the cilantro out of your salad. inspired by a colleague's daily lunch ritual." Clicking the card opens a project-details modal (see below) — the card itself is a button, not a link.
- Cards 2–3 — placeholders: muted background, "coming soon" label, not clickable, no image. Visibly intentional.

### Project details modal
- Opens when a real project card is clicked; built on shadcn `Dialog` (added via the shadcn CLI to `components/ui/dialog.tsx`).
- Content: full-width screenshot, lowercase project title, longer description (for cilantno, drafted from the origin story — owner can edit), optional "built with" tech list and role line (omitted from the UI when not populated in data), and a "visit site →" pill button linking to the live URL in a new tab (`rel="noopener noreferrer"`).
- Dismissed via close button, Esc, or clicking the overlay; shadcn Dialog provides focus trap and scroll lock. Styled to the terra palette (near-white surface, near-black text, pill close/CTA buttons).

### Ticker (dark band) — employer logo marquee
- Infinite CSS-keyframe marquee of previous-employer logos: Abarca Health, Prime Therapeutics, Travelers Insurance, LPL Financial, Thrivent Financial.
- Small lowercase caption above the band: "places i've worked".
- Logos sourced from public web sources (company brand/press pages, Wikimedia) at implementation time; SVG preferred. Rendered monochrome near-white at a uniform height (~32–40px) via white logo variants or CSS filter, separated by a "✦" marker.
- Content duplicated in the DOM so the `translateX(-50%)` loop is seamless.
- The band is not a link (the "let's talk!" CTA lives in the header pill; socials in the footer). Animation pauses on hover.
- Note: corporate logos on a personal portfolio is nominative use and generally tolerated, but it is brand use without explicit permission; swap any logo for a text wordmark if a company objects or no usable asset is found.

### Footer (dark, top border `rgba(254,254,254,0.15)` separating it from the ticker)
- Name, three social icon buttons (GitHub, LinkedIn, Threads — same targets as today), small copyright line.
- Replaces the current tooltip-wrapped social buttons.

## Visual System

- Palette: near-black `#0F0F0F` / near-white `#FEFEFE` only; no accent color. Borders at 15% opacity of the opposing color.
- Typography: DM Sans 400/700 via Google Fonts `<link>` in `index.html`; Inter/system-ui fallback. All headings lowercase.
- Spacing: 8px-multiple scale; section padding 120px (`7.5rem`) top/bottom on desktop.
- Buttons: pill shape (`rounded-full`), 2px border, background/foreground swap on hover.

## Technical Architecture

### Stack
Existing React 19 + TypeScript + Vite (rolldown) + Tailwind CSS 4 + shadcn/ui. The terra design language is translated into this stack; no single-file HTML output.

### Tokens
Terra tokens added to `src/index.css` via Tailwind 4 `@theme`: `--color-ink: #0F0F0F`, `--color-paper: #FEFEFE`, border-opacity variants. Existing shadcn CSS variables remain untouched.

### Components
`App.tsx` becomes a thin composition of section components in `src/components/sections/`:

| Component | Responsibility |
|---|---|
| `SiteHeader.tsx` | Sticky header, hide-on-scroll-down scroll listener, memoji mark, LinkedIn pill CTA |
| `Hero.tsx` | Dark display-typography hero |
| `Projects.tsx` | Light section; maps `projects` data to cards and placeholders; owns which project is open |
| `ProjectDialog.tsx` | Details modal for the selected project (shadcn `Dialog`) |
| `Ticker.tsx` | Employer logo marquee band |
| `SiteFooter.tsx` | Socials + copyright |

shadcn `Button` is reused for pill CTAs. The `Tooltip` component becomes unused but stays in `components/ui/`.

### Data
- `src/data/projects.ts` — typed array: `{ title: string; description: string; details: string; href: string; image: string; tech?: string[]; role?: string } | { comingSoon: true }`. `description` is the card one-liner; `details` is the modal body. Adding a future project is a data edit, not a layout edit.
- `src/data/socials.ts` — GitHub/LinkedIn/Threads links, shared by header and footer.
- `src/data/employers.ts` — typed array `{ name: string; logo: string }` driving the ticker; logo files in `src/assets/logos/`.
- cilantno screenshot copied into `src/assets/cilantno.png` (source: `/Users/stitcombe/.claude/image-cache/8dbdc9e1-6d0b-4c1a-82ac-a2110ecfece5/1.png`, provided in chat 2026-07-03).

### Animation
- `src/hooks/useReveal.ts` — IntersectionObserver (threshold 0.15) toggling an `is-visible` class; CSS handles opacity/translate transitions, with stagger delays for grid children.
- Ticker is pure CSS keyframes.
- Both respect `prefers-reduced-motion: reduce` — reveals render visible immediately; ticker animation is disabled with content still readable.

### Error handling
Static page. Images are bundled Vite imports, so a missing asset fails the build rather than the page.

## Verification

No test framework (repo has none; a static portfolio doesn't justify one). Definition of done:

1. `pnpm typecheck`, `pnpm lint`, `pnpm build` all pass.
2. Visual pass in `pnpm dev`: desktop and mobile widths; header hide/show; ticker loop seamless; reveal animations fire once per element; `prefers-reduced-motion` honored.
3. Modal: opens on card click, closes via button/Esc/overlay click, traps focus, locks scroll; placeholder cards are inert.
4. All external links open in a new tab with `rel="noopener noreferrer"`.

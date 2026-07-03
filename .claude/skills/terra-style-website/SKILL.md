---
name: terra-style-website
description: >
  Build modern, editorial-style agency and portfolio websites inspired by terrahq.com. Use this skill whenever the user wants to create a website with bold contrast design, large display typography, dark/light alternating sections, portfolio grids, scrolling marquee tickers, scroll-reveal animations, and a confident lowercase editorial voice. Trigger on requests like "create a landing page", "build a portfolio site", "make an agency website", "design a creative studio homepage", "build something like Terra HQ", or any request to build a website with an editorial, dark-mode-hero, high-contrast aesthetic. Also trigger when the user wants to build a multi-section marketing or creative agency homepage even without a specific style reference.
---

# Terra-Style Website Builder

You are building a modern, editorial-style website in the visual language of high-end creative agencies like [terrahq.com](https://terrahq.com/en/). These sites feel bold, confident, and human — not corporate. They use stark contrast, oversized lowercase type, and purposeful motion.

Read `references/design-system.md` for the full design token reference (colors, typography, spacing, component library).
Read `references/sections.md` for detailed implementation of each page section.

---

## Core Design Principles

Before writing a single line of code, internalize these principles — they govern every decision:

1. **Near-black + near-white, not pure black/white.** Use `#0F0F0F` and `#FEFEFE`. The subtle difference from pure black/white makes the palette feel crafted rather than default.

2. **Sections alternate dark and light.** The hero is dark. The next section is light. Then dark again. This rhythm creates visual breathing room and makes the page feel dynamic without needing many colors.

3. **Typography does the heavy lifting.** Headlines are massive (clamp from ~60px to ~150px+), lowercase, and bold. The font *is* the design. Copy is confident and punchy — never corporate.

4. **Every section has one job.** Don't cram multiple ideas into one section. Hero = bold statement. Grid = show work. Services = list offerings. Ticker = reinforce CTA. Let each breathe.

5. **Animate to delight, not distract.** Scroll-reveal on entry, a smooth sticky header hide/show, an infinite marquee. Nothing should be jarring or gratuitous.

---

## Output Format

Deliver a **single self-contained HTML file** (unless the user requests separate files). Inline all CSS and JavaScript. The file should:
- Open and work correctly in any modern browser without a server
- Be fully responsive (mobile-first)
- Include all sections described below (or the subset the user requested)

---

## Page Structure

Build these sections in order, each as a `<section>` or `<header>`:

```
1. Preloader           (optional but recommended for polish)
2. Announcement Banner (optional — thin top bar)
3. Sticky Header + Nav
4. Hero
5. Portfolio Grid
6. Services List
7. CTA Marquee Ticker
8. Awards / Social Proof
9. Testimonial
10. Footer CTA + Footer
```

See `references/sections.md` for the exact HTML structure, CSS, and JS for each section.

---

## Typography

**Primary font:** Use a clean, geometric sans-serif. Options in order of preference:
- `"Uncut Sans"` (if available) — the Terra original
- `"DM Sans"` from Google Fonts — very close match, free
- `"Inter"` — reliable fallback

Load via Google Fonts CDN if not using a local font:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
```

**Scale:**
- Display (H1): `clamp(4rem, 12vw, 9.5rem)` — fills the viewport
- Section heading (H2): `clamp(2.5rem, 5vw, 4rem)`
- Body: `1.125rem` (18px)
- Small/caption: `0.875rem`

**Weight:** 400 for body, 700 for all headings and buttons.

**Case:** Headings are **lowercase** — this is a key brand personality choice. Never title-case or all-caps a headline. CTAs like "let's talk!" should feel casual and human.

**Line height:** 1.1–1.15 for headlines, 1.6 for body.

---

## Color System

```css
:root {
  --color-bg:        #FEFEFE;   /* near-white — light section backgrounds */
  --color-dark:      #0F0F0F;   /* near-black — dark section backgrounds, primary text */
  --color-text:      #0F0F0F;   /* body text on light sections */
  --color-text-inv:  #FEFEFE;   /* body text on dark sections */
  --color-border:    rgba(15, 15, 15, 0.15);
  --color-border-inv: rgba(254, 254, 254, 0.15);
}
```

**Accent color:** Terra uses almost none. If the user needs a brand accent, use a single color sparingly (e.g., one CTA, one highlight). Default to none.

---

## Spacing System

Use a consistent spacing scale. Reference units in multiples of 8px:

```css
:root {
  --space-2:   0.5rem;    /*  8px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-30:  7.5rem;    /* 120px */
}
```

Section padding: `var(--space-30)` top and bottom (120px). This generous spacing gives the page its editorial, high-end feel.

---

## Buttons & CTAs

**Pill button** (primary action):
```css
.btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;          /* 8px 24px */
  border-radius: 50px;             /* the defining pill shape */
  background: var(--color-dark);
  color: var(--color-bg);
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  border: 2px solid var(--color-dark);
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
}
.btn:hover {
  background: transparent;
  color: var(--color-dark);
}
/* Inverted (on dark sections) */
.btn--inv {
  background: var(--color-bg);
  color: var(--color-dark);
  border-color: var(--color-bg);
}
.btn--inv:hover {
  background: transparent;
  color: var(--color-bg);
}
```

**CTA link** (informal, large):
```html
<a href="#contact" class="cta-link">let's talk!</a>
```
Style it large (1.5–2rem), bold, with a subtle underline animation on hover.

---

## Animations

### Scroll Reveal
Apply to most section content (headings, cards, images):
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: none;
}
/* Stagger children */
[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
[data-reveal-stagger].is-visible > *:nth-child(1) { transition-delay: 0s; opacity:1; transform:none; }
[data-reveal-stagger].is-visible > *:nth-child(2) { transition-delay: 0.1s; opacity:1; transform:none; }
[data-reveal-stagger].is-visible > *:nth-child(3) { transition-delay: 0.2s; opacity:1; transform:none; }
[data-reveal-stagger].is-visible > *:nth-child(4) { transition-delay: 0.3s; opacity:1; transform:none; }
[data-reveal-stagger].is-visible > *:nth-child(5) { transition-delay: 0.4s; opacity:1; transform:none; }
[data-reveal-stagger].is-visible > *:nth-child(6) { transition-delay: 0.5s; opacity:1; transform:none; }
```

### Sticky Header
```javascript
let lastScrollY = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = currentScrollY;
}, { passive: true });
```
```css
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  transition: transform 0.3s cubic-bezier(0.2, 0, 0.38, 0.9);
  z-index: 100;
}
```

### Infinite Marquee Ticker
```css
.ticker {
  overflow: hidden;
  white-space: nowrap;
  background: var(--color-dark);
  color: var(--color-text-inv);
  padding: var(--space-6) 0;
}
.ticker__track {
  display: inline-flex;
  animation: ticker-scroll 20s linear infinite;
}
.ticker__track:hover { animation-play-state: paused; }
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```
Duplicate the content so the animation loops seamlessly (the `-50%` translate needs two copies).

---

## Responsive Breakpoints

```css
/* Mobile-first. Add breakpoints as needed. */
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* wide */ }
```

On mobile: nav collapses to hamburger, hero text scales down via `clamp()`, the portfolio grid becomes a 2-column or single-column stack, services stack vertically.

---

## Voice & Copy Guidelines

The copy is as important as the visuals. When writing placeholder or demo copy, match Terra's tone:

- **Bold and direct:** "work with an ally, not an agency" — not "we offer digital marketing solutions"
- **Lowercase headings:** "what we do" not "What We Do"
- **Human CTAs:** "let's talk!" not "Contact Us"
- **Short sentences:** Lead with the punch. Explain briefly. Move on.
- **No jargon walls.** One punchy line, then 2–3 sentences of context.

---

## Quality Checklist

Before delivering the website, verify:

- [ ] Near-black/near-white palette applied correctly (not pure `#000`/`#fff`)
- [ ] Headings are lowercase
- [ ] At least 3 alternating dark/light section pairs
- [ ] Hero has oversized display text (`clamp` based, fills viewport on desktop)
- [ ] Portfolio grid shows images in a CSS grid (2–3 columns on desktop, 1–2 on mobile)
- [ ] Pill buttons have `border-radius: 50px`
- [ ] Scroll-reveal `[data-reveal]` applied to key elements
- [ ] Sticky header with hide-on-scroll-down behavior
- [ ] Marquee ticker present and looping
- [ ] Page is fully responsive
- [ ] Single HTML file (unless requested otherwise)

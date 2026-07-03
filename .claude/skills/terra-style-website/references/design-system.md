# Terra-Style Design System Reference

## Full CSS Variables

```css
:root {
  /* Colors */
  --color-bg:          #FEFEFE;
  --color-dark:        #0F0F0F;
  --color-text:        #0F0F0F;
  --color-text-inv:    #FEFEFE;
  --color-text-muted:  rgba(15, 15, 15, 0.5);
  --color-text-muted-inv: rgba(254, 254, 254, 0.5);
  --color-border:      rgba(15, 15, 15, 0.12);
  --color-border-inv:  rgba(254, 254, 254, 0.12);

  /* Typography */
  --font-primary:   'DM Sans', 'Uncut Sans', system-ui, sans-serif;
  --font-weight-normal: 400;
  --font-weight-bold:   700;

  --text-display:  clamp(4rem, 12vw, 9.5rem);
  --text-h2:       clamp(2.5rem, 5vw, 4rem);
  --text-h3:       clamp(1.5rem, 3vw, 2rem);
  --text-body:     1.125rem;
  --text-small:    0.875rem;

  --lh-display:    1.05;
  --lh-heading:    1.1;
  --lh-body:       1.6;

  /* Spacing */
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-30:  7.5rem;    /* 120px */
  --space-40:  10rem;     /* 160px */

  /* Layout */
  --container-max:  1440px;
  --container-pad:  clamp(1.25rem, 5vw, 5rem);

  /* Border Radius */
  --radius-pill:  50px;
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    16px;

  /* Transitions */
  --ease-default:  cubic-bezier(0.2, 0, 0.38, 0.9);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast:   0.15s var(--ease-default);
  --transition-base:   0.3s var(--ease-default);
  --transition-slow:   0.6s var(--ease-out);
}
```

## Base Styles

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  color: var(--color-text);
  background: var(--color-bg);
  overflow-x: hidden;
}

img { display: block; max-width: 100%; height: auto; }

a { color: inherit; text-decoration: none; }

/* Container */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: var(--container-pad);
  padding-right: var(--container-pad);
}

/* Section padding */
.section {
  padding-top: var(--space-30);
  padding-bottom: var(--space-30);
}
.section--dark {
  background: var(--color-dark);
  color: var(--color-text-inv);
}
.section--compact {
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
}
```

## Typography Classes

```css
.display {
  font-size: var(--text-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--lh-display);
  letter-spacing: -0.03em;
  text-transform: lowercase;
}

h1, .h1 {
  font-size: var(--text-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--lh-display);
  letter-spacing: -0.02em;
}

h2, .h2 {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-bold);
  line-height: var(--lh-heading);
  letter-spacing: -0.02em;
  text-transform: lowercase;
}

h3, .h3 {
  font-size: var(--text-h3);
  font-weight: var(--font-weight-bold);
  line-height: var(--lh-heading);
  text-transform: lowercase;
}

.eyebrow {
  font-size: var(--text-small);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
}
```

## Button Variants

```css
/* Base pill button */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-pill);
  font-family: inherit;
  font-size: var(--text-body);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  text-decoration: none;
  border: 2px solid currentColor;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  white-space: nowrap;
}

/* On light background */
.btn--dark {
  background: var(--color-dark);
  color: var(--color-bg);
  border-color: var(--color-dark);
}
.btn--dark:hover {
  background: transparent;
  color: var(--color-dark);
}

/* On dark background */
.btn--light {
  background: var(--color-bg);
  color: var(--color-dark);
  border-color: var(--color-bg);
}
.btn--light:hover {
  background: transparent;
  color: var(--color-bg);
}

/* Ghost (outline only) */
.btn--ghost-dark {
  background: transparent;
  color: var(--color-dark);
  border-color: var(--color-dark);
}
.btn--ghost-dark:hover {
  background: var(--color-dark);
  color: var(--color-bg);
}
```

## Grid Layouts

```css
/* Portfolio image grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}
@media (max-width: 768px) {
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .portfolio-grid { grid-template-columns: 1fr; }
}

/* Wide card spans full width */
.portfolio-grid__item--wide {
  grid-column: span 2;
}

/* Services grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

/* Awards grid */
.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}
```

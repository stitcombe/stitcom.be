# Section Implementation Guide

Each section is documented with its purpose, HTML structure, and CSS. Build them in order for the complete Terra-style page.

---

## 1. Preloader

**Purpose:** Branded entry experience. Shows briefly while the page "loads", then fades out. Creates a sense of polish and intention.

```html
<div class="preloader" id="preloader">
  <div class="preloader__content">
    <!-- Use the brand name or a simple SVG logo -->
    <span class="preloader__brand">Brand</span>
  </div>
</div>
```

```css
.preloader {
  position: fixed;
  inset: 0;
  background: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.6s var(--ease-out), visibility 0.6s;
}
.preloader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.preloader__brand {
  color: var(--color-bg);
  font-size: var(--text-h2);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
}
```

```javascript
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('is-hidden');
    document.body.style.overflow = '';
  }, 600); // Brief delay for effect
});
document.body.style.overflow = 'hidden'; // Prevent scroll during load
```

---

## 2. Announcement Banner

**Purpose:** Thin top bar for a single urgent message, promotion, or news item. Optional.

```html
<div class="announcement-banner">
  <div class="container">
    <p>Something exciting happening? <a href="#">Find out →</a></p>
  </div>
</div>
```

```css
.announcement-banner {
  background: var(--color-bg);
  color: var(--color-text);
  text-align: center;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-small);
  border-bottom: 1px solid var(--color-border);
}
.announcement-banner a {
  font-weight: var(--font-weight-bold);
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

---

## 3. Sticky Header + Navigation

**Purpose:** Always-visible navigation. Hides on scroll-down to give content room; reveals on scroll-up. Dark background anchors the brand.

```html
<header class="header" id="header">
  <div class="container header__inner">
    <a href="/" class="header__logo">
      <span class="header__logo-text">BrandName</span>
    </a>
    <nav class="header__nav" id="nav">
      <ul class="header__nav-list">
        <li><a href="#work">work</a></li>
        <li><a href="#services">services</a></li>
        <li><a href="#about">about</a></li>
        <li><a href="#contact">contact</a></li>
      </ul>
    </nav>
    <a href="#contact" class="btn btn--light header__cta">let's talk!</a>
    <button class="burger" id="burger" aria-label="Toggle menu">
      <span></span><span></span>
    </button>
  </div>
</header>
```

```css
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: var(--color-dark);
  color: var(--color-text-inv);
  z-index: 100;
  transition: transform var(--transition-base);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
}
.header__logo-text {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inv);
  letter-spacing: -0.02em;
}
.header__nav-list {
  display: flex;
  list-style: none;
  gap: var(--space-8);
}
.header__nav-list a {
  color: var(--color-text-inv);
  font-size: var(--text-body);
  opacity: 0.8;
  transition: opacity var(--transition-fast);
  text-transform: lowercase;
}
.header__nav-list a:hover { opacity: 1; }

/* Mobile nav */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}
.burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-bg);
  transition: transform var(--transition-base), opacity var(--transition-base);
}

@media (max-width: 768px) {
  .burger { display: flex; }
  .header__cta { display: none; }
  .header__nav {
    position: fixed;
    inset: 0;
    background: var(--color-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-base);
  }
  .header__nav.is-open {
    opacity: 1;
    pointer-events: all;
  }
  .header__nav-list {
    flex-direction: column;
    align-items: center;
    gap: var(--space-8);
    font-size: var(--text-h3);
  }
}
```

```javascript
// Hide/show header on scroll
let lastScrollY = 0;
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 80) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = window.scrollY;
}, { passive: true });

// Mobile burger
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
});
```

---

## 4. Hero Section

**Purpose:** First impression. Full-viewport, dark background, oversized headline. The copy should be a bold, memorable statement — not a product description.

```html
<section class="hero section--dark" id="hero">
  <div class="container hero__content">
    <h1 class="hero__headline" data-reveal>
      work with an ally,<br>not an agency
    </h1>
    <p class="hero__sub" data-reveal>
      We're for ambitious teams who want to move fast
      and make things that matter.
    </p>
    <div class="hero__actions" data-reveal>
      <a href="#work" class="btn btn--light">see our work</a>
      <a href="#contact" class="cta-link">let's talk →</a>
    </div>
  </div>
</section>
```

```css
.hero {
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-top: calc(var(--space-30) + 80px); /* account for fixed header */
  padding-bottom: var(--space-30);
}
.hero__headline {
  font-size: var(--text-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--lh-display);
  letter-spacing: -0.03em;
  color: var(--color-text-inv);
  margin-bottom: var(--space-8);
  max-width: 20ch;
}
.hero__sub {
  font-size: clamp(1rem, 2vw, 1.375rem);
  color: rgba(254, 254, 254, 0.65);
  max-width: 45ch;
  margin-bottom: var(--space-8);
}
.hero__actions {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}
.cta-link {
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inv);
  text-decoration: underline;
  text-underline-offset: 3px;
  opacity: 0.8;
  transition: opacity var(--transition-fast);
}
.cta-link:hover { opacity: 1; }
```

---

## 5. Portfolio Grid

**Purpose:** Show work visually. A dense grid of images creates an impression of range and volume. No captions needed in the initial view — let the images speak.

```html
<section class="section" id="work">
  <div class="container">
    <p class="eyebrow" data-reveal>selected work</p>
    <div class="portfolio-grid" data-reveal-stagger>
      <!-- Use real project images or colored placeholder divs -->
      <div class="portfolio-grid__item">
        <img src="project-1.jpg" alt="Project name" loading="lazy">
      </div>
      <div class="portfolio-grid__item portfolio-grid__item--wide">
        <img src="project-2.jpg" alt="Project name" loading="lazy">
      </div>
      <!-- Add 8-16 items total -->
    </div>
  </div>
</section>
```

```css
.portfolio-grid__item {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: #1a1a1a; /* fallback while image loads */
}
.portfolio-grid__item--wide {
  aspect-ratio: 2 / 1;
}
.portfolio-grid__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}
.portfolio-grid__item:hover img {
  transform: scale(1.04);
}
```

**Tip for placeholder images:** If no real images are available, use solid color blocks with client/project names overlaid, or use `https://picsum.photos/750/750?random=N` for varied photo placeholders.

---

## 6. Services List

**Purpose:** Tell people what you do. Each service is a named area with a 2–3 sentence description and a "learn more" button. The light background provides breathing room after the image-heavy grid.

```html
<section class="section" id="services">
  <div class="container">
    <p class="eyebrow" data-reveal>what we do</p>
    <div class="services-list">
      <div class="service-item" data-reveal>
        <div class="service-item__header">
          <h2 class="service-item__name">Strategy</h2>
          <a href="#" class="btn btn--dark">learn more</a>
        </div>
        <p class="service-item__desc">
          Winning brands don't wing it. We build strategies shaped
          by your industry, driven by your goals, powered by data.
        </p>
      </div>
      <!-- Repeat for each service -->
    </div>
  </div>
</section>
```

```css
.services-list {
  display: flex;
  flex-direction: column;
  margin-top: var(--space-12);
}
.service-item {
  padding: var(--space-8) 0;
  border-bottom: 1px solid var(--color-border);
}
.service-item:first-child { border-top: 1px solid var(--color-border); }
.service-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
.service-item__name {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  text-transform: lowercase;
}
.service-item__desc {
  max-width: 60ch;
  opacity: 0.7;
}
```

---

## 7. CTA Marquee Ticker

**Purpose:** Repeating call-to-action strip that creates energy and reinforces the invitation to work together. The dark background signals a transition.

```html
<div class="ticker">
  <div class="ticker__track" id="tickerTrack">
    <!-- Duplicate content for seamless loop -->
    <span class="ticker__item">Talk to a digital expert</span>
    <span class="ticker__sep">✦</span>
    <span class="ticker__item">Let's build something great</span>
    <span class="ticker__sep">✦</span>
    <span class="ticker__item">Work with real people</span>
    <span class="ticker__sep">✦</span>
    <!-- Duplicate the above exactly once more -->
    <span class="ticker__item">Talk to a digital expert</span>
    <span class="ticker__sep">✦</span>
    <span class="ticker__item">Let's build something great</span>
    <span class="ticker__sep">✦</span>
    <span class="ticker__item">Work with real people</span>
    <span class="ticker__sep">✦</span>
  </div>
</div>
```

```css
.ticker {
  overflow: hidden;
  background: var(--color-dark);
  color: var(--color-text-inv);
  padding: var(--space-6) 0;
  border-top: 1px solid var(--color-border-inv);
  border-bottom: 1px solid var(--color-border-inv);
}
.ticker__track {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  animation: ticker-scroll 24s linear infinite;
}
.ticker__track:hover { animation-play-state: paused; }
.ticker__item {
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  font-weight: var(--font-weight-bold);
  padding: 0 var(--space-8);
}
.ticker__sep {
  opacity: 0.4;
  font-size: 0.75rem;
}
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 8. Awards / Social Proof

**Purpose:** Build credibility with a minimal cards grid on a dark background. Logos, award names, or notable metrics.

```html
<section class="section section--dark" id="awards">
  <div class="container">
    <h2 class="awards__heading" data-reveal>awards<br><em>&amp; kudos</em></h2>
    <div class="awards-grid" data-reveal-stagger>
      <div class="award-card">
        <p class="award-card__label">Category Winner</p>
        <p class="award-card__title">Best Annual Report 2023</p>
      </div>
      <div class="award-card">
        <p class="award-card__label">3× Winner</p>
        <p class="award-card__title">Fastest Growing Companies</p>
      </div>
      <!-- Add more as needed -->
    </div>
  </div>
</section>
```

```css
.awards__heading {
  font-size: var(--text-display);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inv);
  letter-spacing: -0.03em;
  line-height: var(--lh-display);
  margin-bottom: var(--space-16);
}
.awards__heading em {
  font-style: italic;
  opacity: 0.6;
}
.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1px;
  border: 1px solid var(--color-border-inv);
}
.award-card {
  padding: var(--space-8);
  border: 1px solid var(--color-border-inv);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.award-card__label {
  font-size: var(--text-small);
  font-weight: var(--font-weight-bold);
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.award-card__title {
  color: var(--color-text-inv);
  font-weight: var(--font-weight-bold);
  font-size: 1.1rem;
}
```

---

## 9. Testimonial

**Purpose:** Single featured client quote. Attributed, with company logo if available. Simple — one quote does more than five.

```html
<section class="section testimonial" id="testimonial">
  <div class="container">
    <blockquote class="testimonial__quote" data-reveal>
      <p>"Working with them changed how we think about digital."</p>
    </blockquote>
    <cite class="testimonial__cite" data-reveal>
      <strong>Jane Smith</strong>
      <span>VP of Marketing, Acme Corp</span>
    </cite>
  </div>
</section>
```

```css
.testimonial__quote {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.25;
  letter-spacing: -0.02em;
  max-width: 22ch;
  margin-bottom: var(--space-8);
  border: none;
  padding: 0;
}
.testimonial__quote p::before { content: '"'; }
.testimonial__quote p::after  { content: '"'; }
.testimonial__cite {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-style: normal;
}
.testimonial__cite strong { font-weight: var(--font-weight-bold); }
.testimonial__cite span   { opacity: 0.6; font-size: var(--text-small); }
```

---

## 10. Footer CTA + Footer

**Purpose:** Convert final-scroll visitors. Large CTA, then minimal footer info.

```html
<section class="footer-cta section section--dark">
  <div class="container">
    <h2 class="footer-cta__heading" data-reveal>ready to start?</h2>
    <a href="#contact" class="footer-cta__link" data-reveal>let's talk!</a>
  </div>
</section>

<footer class="footer section--dark">
  <div class="container footer__inner">
    <div class="footer__brand">
      <p class="footer__logo">BrandName</p>
      <p class="footer__tagline">We build for the digital world.</p>
    </div>
    <nav class="footer__nav">
      <a href="#work">work</a>
      <a href="#services">services</a>
      <a href="#about">about</a>
      <a href="#contact">contact</a>
    </nav>
    <p class="footer__legal">© 2025 BrandName. All rights reserved.</p>
  </div>
</footer>
```

```css
.footer-cta { text-align: center; }
.footer-cta__heading {
  font-size: var(--text-display);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inv);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-8);
}
.footer-cta__link {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inv);
  text-decoration: underline;
  text-underline-offset: 4px;
  opacity: 0.85;
  transition: opacity var(--transition-fast);
}
.footer-cta__link:hover { opacity: 1; }

.footer {
  border-top: 1px solid var(--color-border-inv);
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
}
.footer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-8);
  align-items: start;
}
.footer__logo {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inv);
}
.footer__tagline {
  opacity: 0.5;
  font-size: var(--text-small);
  margin-top: var(--space-2);
  color: var(--color-text-inv);
}
.footer__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.footer__nav a {
  color: var(--color-text-inv);
  opacity: 0.6;
  font-size: var(--text-small);
  transition: opacity var(--transition-fast);
  text-transform: lowercase;
}
.footer__nav a:hover { opacity: 1; }
.footer__legal {
  color: var(--color-text-inv);
  opacity: 0.3;
  font-size: var(--text-small);
  align-self: end;
}

@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
```

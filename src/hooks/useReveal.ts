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

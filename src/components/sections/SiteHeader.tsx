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

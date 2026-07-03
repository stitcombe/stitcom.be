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

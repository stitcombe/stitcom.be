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

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

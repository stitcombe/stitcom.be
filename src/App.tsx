import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Ticker } from "@/components/sections/Ticker";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

function App() {
	useReveal();

	return (
		<>
			<SiteHeader />
			<main>
				<Hero />
				<Ticker />
				<Projects />
			</main>
			<SiteFooter />
		</>
	);
}

export default App;

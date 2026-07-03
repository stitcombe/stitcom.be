import cilantnoImage from "@/assets/cilantno.png";
import darwinBrandAssetsImage from "@/assets/darwin-brand-assets.png";

export interface Project {
	title: string;
	description: string;
	details: string;
	href: string;
	image: string;
	tech?: string[];
	role?: string;
}

export interface PlaceholderProject {
	comingSoon: true;
}

export type PortfolioEntry = Project | PlaceholderProject;

export function isPlaceholder(
	entry: PortfolioEntry,
): entry is PlaceholderProject {
	return "comingSoon" in entry;
}

export const portfolio: PortfolioEntry[] = [
	{
		title: "cilantno",
		description:
			"A game about picking the cilantro out of your salad. Inspired by a colleague’s daily lunch ritual.",
		details:
			"A colleague of mine had a daily lunch ritual: opena a bag of salad, then spend the first few minutes of lunch picking every last piece of cilantro out of it. Cilantno turns that ritual into a game — race the clock to pull the cilantro from the bowl without grabbing the good stuff.",
		href: "https://cilantno.loon.sh",
		image: cilantnoImage,
	},
	{
		title: "Darwin Brand Assets",
		description: "A brand library for Darwin's assets.",
		details: "tbd",
		href: "https://darwin-assets-library.pages.dev",
		image: darwinBrandAssetsImage,
	},
	{ comingSoon: true },
];

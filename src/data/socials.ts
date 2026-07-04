import type { IconType } from "react-icons";
import { VscGithubInverted } from "react-icons/vsc";
import { FaLinkedin, FaThreads } from "react-icons/fa6";
import { Ghost } from "lucide-react";

export interface SocialLink {
	label: string;
	href: string;
	icon: IconType;
}

export const linkedInUrl = "https://www.linkedin.com/in/stephentitcombe";

export const socialLinks: SocialLink[] = [
	{
		label: "GitHub",
		href: "https://github.com/stitcombe",
		icon: VscGithubInverted,
	},
	{
		label: "LinkedIn",
		href: linkedInUrl,
		icon: FaLinkedin,
	},
	{
		label: "Threads",
		href: "https://www.threads.net/@spault",
		icon: FaThreads,
	},
	{
		label: "Blog",
		href: "https://stitcombe.bearblog.dev",
		icon: Ghost,
	},
];

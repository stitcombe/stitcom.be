import abarcaLogo from "@/assets/logos/abarca-health.svg";
import primeLogo from "@/assets/logos/prime-therapeutics.svg";
import travelersLogo from "@/assets/logos/travelers.svg";
import lplLogo from "@/assets/logos/lpl-financial.svg";
import thriventLogo from "@/assets/logos/thrivent.svg";

export interface Employer {
	name: string;
	/** Omitted → the ticker renders the name as a text wordmark. */
	logo?: string;
}

export const employers: Employer[] = [
	{ name: "Abarca Health", logo: abarcaLogo },
	{ name: "Prime Therapeutics", logo: primeLogo },
	{ name: "Travelers Insurance", logo: travelersLogo },
	{ name: "LPL Financial", logo: lplLogo },
	{ name: "Thrivent Financial", logo: thriventLogo },
];

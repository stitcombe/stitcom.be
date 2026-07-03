import cilantnoImage from '@/assets/cilantno.png';

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
  entry: PortfolioEntry
): entry is PlaceholderProject {
  return 'comingSoon' in entry;
}

export const portfolio: PortfolioEntry[] = [
  {
    title: 'cilantno',
    description:
      'a game about picking the cilantro out of your salad. inspired by a colleague’s daily lunch ritual.',
    details:
      'a colleague of mine had a daily lunch ritual: order a salad, then spend the first few minutes of lunch picking every last piece of cilantro out of it. cilantno turns that ritual into a game — race the clock to pull the cilantro from the bowl without grabbing the good stuff.',
    href: 'https://cilantno.loon.sh',
    image: cilantnoImage,
  },
  { comingSoon: true },
  { comingSoon: true },
];

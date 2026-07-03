import { socialLinks } from '@/data/socials';

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/15 bg-ink px-6 py-16 text-paper md:px-12">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <p className="text-2xl font-bold">stephen titcombe</p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex size-12 items-center justify-center rounded-full border-2 border-paper text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <link.icon className="size-6" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-12 text-sm text-paper/60">
        © {new Date().getFullYear()} stephen titcombe
      </p>
    </footer>
  );
}

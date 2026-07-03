import { useState } from 'react';
import { isPlaceholder, portfolio, type Project } from '@/data/projects';
import { ProjectDialog } from './ProjectDialog';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section className="bg-paper px-6 py-30 text-ink md:px-12">
      <h2
        data-reveal
        className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight"
      >
        selected work
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {portfolio.map((entry, i) =>
          isPlaceholder(entry) ? (
            <div
              key={`placeholder-${i}`}
              data-reveal
              className="flex aspect-[4/3] items-center justify-center rounded-lg bg-ink/5 text-lg font-bold text-ink/55"
            >
              coming soon
            </div>
          ) : (
            <button
              key={entry.title}
              type="button"
              data-reveal
              onClick={() => setSelected(entry)}
              className="group cursor-pointer overflow-hidden rounded-lg border border-ink/15 text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={entry.image}
                  alt={`${entry.title} screenshot`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{entry.title}</h3>
                <p className="mt-2 text-ink/70">{entry.description}</p>
              </div>
            </button>
          )
        )}
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

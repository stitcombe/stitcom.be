import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/projects';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  return (
    <Dialog
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto border-ink/15 bg-paper text-ink sm:max-w-2xl">
        {project && (
          <>
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full rounded-md"
            />
            <DialogHeader className="text-left">
              <DialogTitle className="text-3xl font-bold lowercase">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-ink/70">
                {project.details}
              </DialogDescription>
            </DialogHeader>
            {project.tech && (
              <p className="text-sm text-ink/60">
                built with: {project.tech.join(', ')}
              </p>
            )}
            {project.role && (
              <p className="text-sm text-ink/60">role: {project.role}</p>
            )}
            <Button
              asChild
              className="w-fit rounded-full border-2 border-ink bg-ink text-base font-bold text-paper hover:bg-transparent hover:text-ink"
            >
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                visit site →
              </a>
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

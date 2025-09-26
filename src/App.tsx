import memoji from '@/assets/memoji.png';
import { VscGithubInverted } from 'react-icons/vsc';
import { FaLinkedin, FaThreads } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function App() {
  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/stitcombe',
      icon: <VscGithubInverted className="size-6" />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/stephentitcombe/',
      icon: <FaLinkedin className="size-6" />,
    },
    {
      label: 'Threads',
      href: 'https://www.threads.net/@spault',
      icon: <FaThreads className="size-6" />,
    },
  ];

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50">
        <img src={memoji} alt="memoji" className="h-40" />{' '}
        <h1
          className="text-primary bg-clip-text text-center text-6xl font-bold"
          style={{ wordBreak: 'keep-all' }}
        >
          Hi, I&apos;m Stephen Titcombe.
        </h1>
        <div className="flex flex-row items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <TooltipProvider key={link.href}>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full size-12 cursor-auto"
                      aria-label="link button"
                    >
                      {link.icon}
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

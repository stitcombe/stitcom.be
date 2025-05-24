import React from 'react';
import memoji from 'assets/memoji.png';
import { VscGithubInverted } from 'react-icons/vsc';
import { FaLinkedin, FaThreads } from 'react-icons/fa6';
import { Button } from '~/components/ui/button'; // Assuming shadcn/ui button is here
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'; // Assuming shadcn/ui tooltip is here

function App() {
  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/stitcombe',
      icon: <VscGithubInverted className="h-6 w-6" />, // Adjusted size with Tailwind
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/stephentitcombe/',
      icon: <FaLinkedin className="h-5 w-5" />, // Adjusted size
    },
    {
      label: 'Threads',
      href: 'https://www.threads.net/@spault',
      icon: <FaThreads className="h-6 w-6" />, // Adjusted size
    },
  ];

  return (
    <div>
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50"
      >
        <img src={memoji} alt="memoji" className="h-40" /> {/* 10em = h-40 (10rem) */}
        <h1
          className="bg-gradient-to-l from-[#0071BE] to-[#981D87] bg-clip-text text-center text-6xl text-transparent"
          style={{ wordBreak: 'keep-all' }} // word-break: keep-all is not directly in Tailwind, using style or a custom utility
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
                      variant="default" // Using default shadcn/ui solid variant
                      size="lg" // Chakra 'lg' IconButton
                      className="rounded-full w-12 h-12 p-0 flex items-center justify-center" // Ensure it's round and icon is centered
                    >
                      {link.icon}
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">
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

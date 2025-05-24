import React from 'react';
import { LuCopy, LuCheck } from 'react-icons/lu'; // Using Lucide icons as an example
import { Button } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import useCopyToClipboard from '~/hooks/useCopyToClipboard'; // Assuming hook is in this location

interface CopyToClipboardButtonProps {
  textToCopy: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export default function CopyToClipboardButton({
  textToCopy,
  tooltipPosition = 'top',
}: CopyToClipboardButtonProps): JSX.Element {
  const [copyToClipboard, hasCopied] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(textToCopy);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={hasCopied ? 0 : 1000}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Copy to clipboard"
            data-testid="copy-to-clipboard-button"
            onClick={handleCopy}
          >
            {hasCopied ? <LuCheck className="h-4 w-4" /> : <LuCopy className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipPosition}>
          <p>{hasCopied ? 'Copied!' : 'Copy to clipboard'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

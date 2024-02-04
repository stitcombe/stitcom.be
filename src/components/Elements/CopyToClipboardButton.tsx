import React from 'react';
import {
  defineStyle,
  defineStyleConfig,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { MdDone } from 'react-icons/md';
import { BiCopy } from 'react-icons/bi';

const noHover = defineStyle({
  _hover: {},
});

export const disableHover = defineStyleConfig({
  variants: { noHover },
});

export default function CopyToClipboardButton({
  onClick,
  isCopied,
}: {
  onClick: () => void;
  isCopied: boolean;
}): JSX.Element {
  return (
    <Tooltip
      hasArrow
      label={isCopied ? 'Copied' : 'Click to copy'}
      placement="top"
      openDelay={isCopied ? 0 : 1000}
    >
      <IconButton
        icon={isCopied ? <MdDone /> : <BiCopy />}
        variant="disableHover"
        aria-label="Copy to clipboard"
        data-testid="copy-to-clipboard-button"
        onClick={onClick}
      />
    </Tooltip>
  );
}

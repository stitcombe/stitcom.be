import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

/* Components */
import CopyToClipboardButton from 'components/Elements/CopyToClipboardButton';

const copiedState = false;

describe('Test Copy To Clipboard Button component', () => {
  it('Renders CopyToClipboardButton', () => {
    const dom = render(
      <CopyToClipboardButton onClick={() => {}} isCopied={copiedState} />
    );
    expect(dom.getByTestId('copy-to-clipboard-button')).toBeInTheDocument();
  });

  it('isCopied == false', () => {
    render(<CopyToClipboardButton onClick={() => {}} isCopied={copiedState} />);
    fireEvent.mouseOver(screen.getByTestId('copy-to-clipboard-button'));
    setTimeout(() => {
      expect(screen.getByText(/click to copy/i)).toBeInTheDocument();
    }, 1100);
  });

  it('isCopied == true', () => {
    render(<CopyToClipboardButton onClick={() => {}} isCopied={copiedState} />);
    fireEvent.mouseOver(screen.getByTestId('copy-to-clipboard-button'));
    setTimeout(() => {
      expect(screen.getByText(/copied/i)).toBeInTheDocument();
    }, 1100);
  });
});

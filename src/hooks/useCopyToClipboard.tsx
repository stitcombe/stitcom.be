import { useCallback, useState } from 'react';

export default function useCopyToClipboard(): [
  (value: string) => void,
  boolean,
  string | null,
] {
  const [copyValue, setCopyValue] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback((value: string | null) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText && value) {
          await navigator.clipboard.writeText(value);
          setCopyValue(value);
          setHasCopied(true);
          setTimeout(() => setHasCopied(false), 2000);
        } else {
          throw new Error('writeText not supported');
        }
      } catch (e) {
        throw new Error('something went wrong!');
      }
    };
    handleCopy();
  }, []);
  return [copyToClipboard, hasCopied, copyValue];
}

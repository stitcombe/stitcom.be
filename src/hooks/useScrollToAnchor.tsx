import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToAnchor() {
  const { hash } = useLocation();
  const hashRef = useRef('');

  useEffect(() => {
    if (hash) {
      hashRef.current = hash.slice(1);
    }

    if (hashRef.current && document.getElementById(hashRef.current)) {
      setTimeout(() => {
        document
          .getElementById(hashRef.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        hashRef.current = '';
      }, 100);
    }
  }, [hash]);

  return { hash };
}

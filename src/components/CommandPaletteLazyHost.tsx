'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LoadedCommandPaletteHost = dynamic(
  () => import('@/components/CommandPalette').then((mod) => mod.CommandPaletteHost),
  {
    ssr: false,
    loading: () => null,
  }
);

export function CommandPaletteLazyHost() {
  const [openRequestId, setOpenRequestId] = useState(0);

  useEffect(() => {
    function requestOpen() {
      setOpenRequestId((id) => id + 1);
    }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        requestOpen();
      }
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('hokmeta-open-search', requestOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hokmeta-open-search', requestOpen);
    };
  }, []);

  if (!openRequestId) return null;

  return <LoadedCommandPaletteHost key={openRequestId} initialOpen />;
}

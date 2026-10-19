import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { mockCatalog, mockCopies } from '../data/mock';

function usePreviewState() {
  const [showCatalogNotes, setShowCatalogNotes] = useState(true);
  const [compactRows, setCompactRows] = useState(false);
  return useMemo(() => ({ mode: 'mock' as const, catalog: mockCatalog, copies: mockCopies,
    showCatalogNotes, setShowCatalogNotes, compactRows, setCompactRows }), [showCatalogNotes, compactRows]);
}
const PreviewContext = createContext<ReturnType<typeof usePreviewState> | null>(null);
export function PreviewProvider({ children }: PropsWithChildren) {
  return <PreviewContext.Provider value={usePreviewState()}>{children}</PreviewContext.Provider>;
}
export function usePreview() {
  const state = useContext(PreviewContext);
  if (!state) throw new Error('PreviewProvider is required');
  return state;
}

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SlopContextType {
  isSlop: boolean;
  toggleSlop: () => void;
  setSlop: (value: boolean) => void;
}

const SlopContext = createContext<SlopContextType | undefined>(undefined);

export function SlopProvider({ children }: { children: ReactNode }) {
  const [isSlop, setIsSlop] = useState(false);

  const toggleSlop = () => setIsSlop(prev => !prev);
  const setSlop = (value: boolean) => setIsSlop(value);

  return (
    <SlopContext.Provider value={{ isSlop, toggleSlop, setSlop }}>
      {children}
    </SlopContext.Provider>
  );
}

export function useSlop() {
  const context = useContext(SlopContext);
  if (context === undefined) {
    throw new Error('useSlop must be used within a SlopProvider');
  }
  return context;
}



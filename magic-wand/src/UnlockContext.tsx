import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UnlockContextType {
  supportedGestures: string[];
  unlockGesture: string;
  setUnlockGesture: (gesture: string) => void;
  gestureMatched: boolean;
  setGestureMatched: (matched: boolean) => void;
  supportedWords: string[];
  unlockWord: string;
  setUnlockWord: (word: string) => void;
  wordMatched: boolean;
  setWordMatched: (matched: boolean) => void;
}

const UnlockContext = createContext<UnlockContextType | undefined>(undefined);

export const UnlockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [supportedGestures] = useState<string[]>(['flick', 'triangle']);
  const [supportedWords] = useState<string[]>(['apples', 'ocean', 'nebula', 'vortex', 'tundra', 'falcon']);

  const [unlockGesture, setUnlockGesture] = useState<string>(supportedGestures[0]);
  const [gestureMatched, setGestureMatched] = useState<boolean>(false);
  const [unlockWord, setUnlockWord] = useState<string>(supportedWords[0]);
  const [wordMatched, setWordMatched] = useState<boolean>(false);
  
  // Providing all values to child components
  return (
    <UnlockContext.Provider
      value={{
        supportedGestures,
        unlockGesture,
        setUnlockGesture,
        gestureMatched,
        setGestureMatched,
        supportedWords,
        unlockWord,
        setUnlockWord,
        wordMatched,
        setWordMatched,
      }}
    >
      {children}
    </UnlockContext.Provider>
  );
};

export const useUnlockContext = (): UnlockContextType => {
  const context = useContext(UnlockContext);
  if (!context) {
    throw new Error('useUnlockContext must be used within an UnlockProvider');
  }
  return context;
};

// src/context/AppContext.tsx
import React, {createContext, useState, ReactNode} from 'react';

interface AppContextInterface {
  state: string;
  setState: (value: string) => void;
}

const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, setState] = useState<string>('Hello World');

  return (
    <AppContext.Provider value={{state, setState}}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};

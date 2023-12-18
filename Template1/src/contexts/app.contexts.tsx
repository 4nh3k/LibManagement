import { createContext, useContext, useState } from 'react';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS } from 'src/utils/auth';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const getInitialAppContext = (): AppContextInterface => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
});

const initialContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialContext);

export const AppProvider = ({
  children,
  defaultValue = initialContext
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

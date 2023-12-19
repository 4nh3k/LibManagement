import { createContext, useContext, useState } from 'react';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}

export const getInitialAppContext = (): AppContextInterface => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
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
  const [profile, setProfile] = useState<User | null>(defaultValue.profile);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
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

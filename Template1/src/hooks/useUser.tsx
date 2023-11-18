import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getMe } from 'src/helpers/api';
import { LoginResponse } from 'src/helpers/localStorage';
import * as userLocalStorage from 'src/helpers/localStorage';

export function useUser() {
  const { data: user } = useQuery(['user'], async (): Promise<LoginResponse | null> => getMe(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStorage.getUser,
    onError: () => {
      userLocalStorage.removeUser();
    }
  });

  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null
  };
}

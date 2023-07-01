
import { useMeQuery } from '@social-zone/graphql';
import { useAuth } from './useAuth';

export const useProfileQuery = () => {
  const { isAuthenticated } = useAuth();
  return useMeQuery({} ,{ enabled: isAuthenticated });
};

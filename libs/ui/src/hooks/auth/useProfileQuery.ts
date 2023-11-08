'use client';
import { useMeQuery } from '@social-zone/graphql';

export const useProfileQuery = () => {
  return useMeQuery({});
};

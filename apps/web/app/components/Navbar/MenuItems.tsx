"use client"
import Link from 'next/link';
import type { FC } from 'react';

import SignedUser from './SignedUser';
import { useAuth } from '~ui';
import { LoginButton } from '../modals/LoginButton';

export const NextLink = ({ href, children, ...rest }: Record<string, any>) => (
  <Link href={href} {...rest}>
    {children}
  </Link>
);

const NavMenuItems: FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return <SignedUser />;
};

export default NavMenuItems;

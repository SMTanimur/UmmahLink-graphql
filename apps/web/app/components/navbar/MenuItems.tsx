
import Link from 'next/link';
import type { FC } from 'react';

import SignedUser from './SignedUser';
import { useAuth } from '@social-zone/client';
import { LoginButton } from '../modals/LoginButton';

export const NextLink = ({ href, children, ...rest }: Record<string, any>) => (
  <Link href={href} {...rest}>
    {children}
  </Link>
);

const MenuItems: FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return <SignedUser />;
};

export default MenuItems;

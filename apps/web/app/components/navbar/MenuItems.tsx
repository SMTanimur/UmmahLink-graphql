/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from 'next/link';
import type { FC } from 'react';
import SignedUser from './SignedUser';


export const NextLink = ({ href, children, ...rest }: Record<string, any>) => (
  <Link href={href} {...rest}>
    {children}
  </Link>
);

const MenuItems: FC = () => {
  return  <SignedUser />;
}

export default MenuItems;

"use client"

/* eslint-disable @next/next/no-img-element */

import { Disclosure } from '@headlessui/react';
import { useProfileQuery } from '~ui';
import {
  BellIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';
import { GradientBar, Heading,  cn } from '~ui';

import MoreNavItems from './MoreNavItems';
import { IUser } from '@social-zone/graphql';
import MenuItems from './MenuItems';
import Search from './Search';
import { usePathname, useRouter } from 'next/navigation';

const Navbar: FC = () => {
  const { data } = useProfileQuery();
  const currentProfile = data?.me;

  const router = useRouter();

  const onProfileSelected = (profile: IUser) => {
    router.push(`/u/${profile?.username}`);
  };

  interface NavItemProps {
    url: string;
    name: string;
    current: boolean;
  }

  const NavItem = ({ url, name, current }: NavItemProps) => {
    return (
      <Link
        href={url}
        aria-current={current ? 'page' : undefined}
        data-testid={`nav-item-${name.toLowerCase()}`}
      >
        <Disclosure.Button
          className={cn(
            'w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm font-bold tracking-wide md:px-3',
            {
              'bg-gray-200 text-black dark:bg-gray-800 dark:text-white':
                current,
              'text-gray-700 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white':
                !current,
            }
          )}
        >
          {name}
        </Disclosure.Button>
      </Link>
    );
  };

  const NavItems = () => {
    const  pathname  = usePathname();

    return (
      <>
        <NavItem url="/" name={`Home`} current={pathname === '/'} />
        <NavItem
          url="/explore"
          name={`Explore`}
          current={pathname === '/explore'}
        />
        <MoreNavItems />
      </>
    );
  };

  return (
    <Disclosure
      as="header"
      className="divider sticky top-0 z-10 w-full bg-white dark:bg-black"
    >
      {({ open }) => (
        <>
        <GradientBar color="indigo" />
          <div className="container mx-auto max-w-screen-xl px-5">
            <div className="relative flex h-14 items-center justify-between sm:h-16">
              <div className="flex items-center justify-start">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-gray-500 focus:outline-none md:hidden">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
                <Link href="/" className="hidden md:block">
                  <Heading size="h5" className="gradient-text">
                    UmmahLink
                  </Heading>
                </Link>
                <div className="hidden sm:ml-6 md:block">
                  <div className="flex items-center space-x-4">
                    <div className="hidden md:block">
                      <Search onProfileSelected={onProfileSelected} />
                    </div>
                    <NavItems />
                  </div>
                </div>
              </div>
              <Link
                href="/"
                className={cn(
                  'md:hidden',
                  !currentProfile?._id && 'ml-[60px]'
                )}
              >
                <Heading size="h5" className="gradient-text">
                    UmmahLink
                  </Heading>
              </Link>
              <div className="flex items-center gap-4">
                {currentProfile ? (
                  <>
                    <InboxIcon className='h-5 w-5' />
                    <BellIcon className='h-5 w-5' />
                  </>
                ) : null}
                <MenuItems />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="m-3">
              <Search hideDropdown onProfileSelected={onProfileSelected} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

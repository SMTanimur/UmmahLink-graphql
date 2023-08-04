'use client';

import { Menu } from '@headlessui/react';
import type { FC } from 'react';
import Logout from './NavItems/Logout';

import YourProfile from './NavItems/YourProfile';
import {
  Image,
  MenuTransition,
  Slug,
  UserAvatarUrl,
  cn,
  useGlobalModalStateStore,
  useProfileQuery,
} from '~ui';

import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import MobileDrawerMenu from './MobileDrawerMenu';

const SignedUser: FC = () => {
  const { data } = useProfileQuery();
  const currentProfile = data?.me;
  const setShowMobileDrawer = useGlobalModalStateStore(
    (state) => state.setShowMobileDrawer
  );
  const showMobileDrawer = useGlobalModalStateStore(
    (state) => state.showMobileDrawer
  );

  const Avatar = () => (
    <Image
      src={
        currentProfile?.avatar.avatarUrl
          ? currentProfile?.avatar.avatarUrl
          : UserAvatarUrl
      }
      className="h-8 w-8 cursor-pointer rounded-full border dark:border-gray-700"
      alt={currentProfile?.username}
    />
  );

  const openMobileMenuDrawer = () => {
    setShowMobileDrawer(true);
  };

  return (
    <>
      {showMobileDrawer && <MobileDrawerMenu />}
      <button
        className="focus:outline-none md:hidden"
        onClick={() => openMobileMenuDrawer()}
      >
        <Avatar />
      </button>
      <Menu as="div" className="hidden md:block">
        <Menu.Button className="flex self-center">
          <Avatar />
        </Menu.Button>
        <MenuTransition>
          <Menu.Items
            static
            className="absolute right-0 mt-2 w-48 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-black"
          >
            <Menu.Item
              as="div"
              className="m-2 flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Link href={`/user/${currentProfile?.username}`}>
                <span>
                  <span>Logged in as</span>
                  <div className="truncate">
                    <Slug
                      className="font-bold"
                      slug={currentProfile?.username as any}
                      prefix="@"
                    />
                  </div>
                </span>
              </Link>
            </Menu.Item>
            <div className="divider" />
            {/* <Menu.Item
              as="div"
              className={({ active }: { active: boolean }) =>
                cn(
                  { 'dropdown-active': active },
                  'm-2 rounded-lg border dark:border-gray-700'
                )
              }
            >
              <SwitchProfile />
            </Menu.Item> */}

            <div className="divider" />
            <Menu.Item
              as="div"
              className={({ active }: { active: boolean }) =>
                cn({ 'dropdown-active': active }, 'menu-item ')
              }
            >
              <Link href={`/user/${currentProfile?.username}`}>
                <YourProfile />
              </Link>
            </Menu.Item>

            <div className="divider" />
            <Menu.Item
              as="div"
              className={({ active }) =>
                cn({ 'dropdown-active': active }, 'm-2 rounded-lg')
              }
            >
              <Logout />
            </Menu.Item>
            <div className="divider" />
            <Menu.Item as="div">
              <ThemeSwitch />
            </Menu.Item>
          </Menu.Items>
        </MenuTransition>
      </Menu>
    </>
  );
};

export default SignedUser;

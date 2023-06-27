import { Menu } from '@headlessui/react';
import type { FC } from 'react';
import { NextLink } from './MenuItems';
import AppVersion from './NavItems/AppVersion';
import Logout from './NavItems/Logout';

import YourProfile from './NavItems/YourProfile';
import { Image, MenuTransition, Slug, cn } from '~ui';
import { useProfileQuery } from '@social-zone/client';
import Status from './NavItems/Status';
import SwitchTheme from './SwitchTheme';
import ThemeSwitch from './ThemeSwitch';

const SignedUser: FC = () => {
  const {data}=useProfileQuery()
  const currentProfile = data?.me;
  // const setShowMobileDrawer = useGlobalModalStateStore(
  //   (state) => state.setShowMobileDrawer
  // );
  // const showMobileDrawer = useGlobalModalStateStore(
  //   (state) => state.showMobileDrawer
  // );

  const Avatar = () => (
    <Image
      src={currentProfile?.avatar}
      className="h-8 w-8 cursor-pointer rounded-full border dark:border-gray-700"
      alt={currentProfile?.username}
    />
  );

  const openMobileMenuDrawer = () => {
    // setShowMobileDrawer(true);
  };

  return (
    <>
      {/* {showMobileDrawer && <MobileDrawerMenu />} */}
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
              as={NextLink}
              href={`/user/${currentProfile?.username}`}
              className="m-2 flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
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
            <Menu.Item
              as="div"
              className={({ active }: { active: boolean }) =>
                cn(
                  { 'dropdown-active': active },
                  'm-2 rounded-lg border dark:border-gray-700'
                )
              }
            >
              <Status />
            </Menu.Item>
            <div className="divider" />
            <Menu.Item
              as={NextLink}
              href={`/user/${currentProfile?.username}`}
              className={({ active }: { active: boolean }) =>
                cn({ 'dropdown-active': active }, 'menu-item ')
              }
            >
              <YourProfile />
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
            <Menu.Item
              as="div"
              
            >
              <ThemeSwitch />
            </Menu.Item>
            
        
            <div className="divider" />
            <AppVersion />
          </Menu.Items>
        </MenuTransition>
      </Menu>
    </>
  );
};

export default SignedUser;

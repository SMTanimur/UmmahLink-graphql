'use client';
import { Menu } from '@headlessui/react';
import { cn, useUserPersistStore } from '~ui';

import { FC } from 'react';
import Logout from './Logout';
import ThemeSwitch from './ThemeSwitch';
import { MenuTransition } from '../components/ui/menu/MenuTransition';


const SignedUser: FC = () => {
  const currentProfile = useUserPersistStore((state) => state.currentUser);
  // const setShowMobileDrawer = useGlobalModalStateStore(
  //   (state) => state.setShowMobileDrawer
  // );
  // const showMobileDrawer = useGlobalModalStateStore(
  //   (state) => state.showMobileDrawer
  // );

  // const Avatar = () => (
  //   <Image
  //     src={getAvatar(currentProfile as Profile)}
  //     className="h-8 w-8 cursor-pointer rounded-full border dark:border-gray-700"
  //     alt={formatHandle(currentProfile?.handle)}
  //   />
  // );

  // const openMobileMenuDrawer = () => {
  //   setShowMobileDrawer(true);
  // };

  return (
    <>
      {/* {showMobileDrawer && <MobileDrawerMenu />} */}
      <button
        className="focus:outline-none md:hidden"
        // onClick={() => openMobileMenuDrawer()}
      >
        {/* <Avatar /> */}
      </button>
      <Menu as="div" className="hidden md:block">
        <Menu.Button className="flex self-center">
          {/* <Avatar /> */}
        </Menu.Button>
        <MenuTransition>
          <Menu.Items
            static
            className="absolute right-0 mt-2 w-48 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-black"
          >
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
              className={({ active }) =>
                cn({ 'dropdown-active': active }, 'm-2 rounded-lg')
              }
            >
              <ThemeSwitch />
            </Menu.Item>

            <div className="divider" />
          </Menu.Items>
        </MenuTransition>
      </Menu>
    </>
  );
};

export default SignedUser;

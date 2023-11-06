"use client"

import { XMarkIcon } from '@heroicons/react/24/outline';
import { UserAvatarUrl, useGlobalModalStateStore, useProfileQuery } from '~ui';
import Link from 'next/link';
import type { FC } from 'react';
import { Image, Slug } from '~ui';
import SwitchTheme from './SwitchTheme';
import YourProfile from './NavItems/YourProfile';
import Logout from './NavItems/Logout';

const MobileDrawerMenu: FC = () => {
  const { data } = useProfileQuery();

  const setShowMobileDrawer = useGlobalModalStateStore(
    (state) => state.setShowMobileDrawer
  );

  const closeDrawer = () => {
    setShowMobileDrawer(false);
  };

  return (
    <div className="no-scrollbar fixed inset-0 z-10 h-full w-full overflow-y-auto bg-gray-100 py-4 dark:bg-black md:hidden">
      <button className="px-5" type="button" onClick={closeDrawer}>
        <XMarkIcon className="h-6 w-6" />
      </button>
      <div className="w-full space-y-2">
        <Link
          onClick={closeDrawer}
          href={`/user/${data?.me?.username}`}
          className="mt-2 flex items-center space-x-2 px-5 py-3 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <div className="flex w-full space-x-1.5">
            <Image
              src={data?.me?.avatar?.avatarUrl || UserAvatarUrl}
              className="h-12 w-12 cursor-pointer rounded-full border dark:border-gray-700"
              alt={data?.me?.username}
            />
            <div>
              <span>Logged in as</span>
              <div className="truncate">
                <Slug
                  className="font-bold"
                  slug={data?.me?.username as any}
                  prefix="@"
                />
              </div>
            </div>
          </div>
        </Link>
        <div className="bg-white dark:bg-gray-900 ">
          <div className="divider" />
          <div>
            <Link href={`/user/${data?.me?.username}`} onClick={closeDrawer}>
              <YourProfile className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800" />
            </Link>
            <Link href={'/settings'} onClick={closeDrawer}>
              setting
            </Link>

            <SwitchTheme />
          </div>
          <div className="divider" />
        </div>
        <div className="bg-white dark:bg-gray-900">
          <div className="divider" />
        </div>

        <div className="bg-white dark:bg-gray-900">
          <div className="divider" />
          <div className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <Logout onClick={closeDrawer} className="py-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawerMenu;

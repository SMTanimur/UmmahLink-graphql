'use client';
import Link from 'next/link';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import Search from './Search';
import { Button, useUserPersistStore } from '~ui';
import { useTheme } from 'next-themes';
import SwitchTheme from './SwitchTheme';

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const { currentUser } = useUserPersistStore();
  return (
    <Disclosure
      as="header"
      className="divider sticky top-0 z-10 w-full bg-white dark:bg-black border-b-2 border-gray-200"
    >
      {({ open }) => (
        <>
          <div className="layout-container px-5">
            <div className="relative flex h-16 items-center justify-between sm:h-16 md:h-20">
              <div className="flex items-center justify-start">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-gray-500 focus:outline-none md:hidden">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
                <Link
                  href="/"
                  className="hidden md:block text-base md:text-2xl gradient-text"
                >
                  UmmahLink
                </Link>
                <div className="hidden sm:ml-6 md:block">
                  <Search />
                </div>
              </div>

              <div className="hidden md:flex laptop:items-center space-x-2">
                {currentUser ? (
                  <>
                    {/* ----- FOLLOW/MESSAGE/NOTIF ICONS ------ */}
                    <ul className="flex items-center space-x-8 mr-8">
                      <li className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-indigo-1100">
                        <span>message</span>
                        {/* <Messages currentUser={currentUser} /> */}
                      </li>
                      {/* <li className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-indigo-1100">
                        notification
                        <Notification currentUser={currentUser} />
                      </li> */}
                    </ul>
                    <div className="flex items-center">
                      {/* ---- AVATAR WITH  USERNAME ----------- */}
                      <Link
                        href={`/user/${currentUser?.username}`}
                        className="cursor-pointer"
                      >
                        {/* <div className="flex items-center">
                          <Avatar url={typeof auth?.profilePicture === 'string' ? auth?.profilePicture : auth?.profilePicture?.url} className="mr-2" />
                          <h6 className="text-sm mr-10 dark:text-indigo-400">@{auth?.username}</h6>
                        </div> */}
                      </Link>
                      {/* ----- LOGOUT BUTTON ------ */}
                      <button
                        className="button--muted !rounded-full dark:bg-indigo-1100 dark:text-white dark:hover:bg-indigo-900 dark:hover:text-white dark:active:bg-indigo-1100"
                        // onClick={logoutModal.openModal}
                        // disabled={isLoggingOut}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <ul className="flex items-center">
                    <li className="group inline-block mx-3">
                      <Button size="sm" variant="secondary">
                        <Link href="/login">Login</Link>
                      </Button>
                    </li>
                    <li className="group inline-block mx-3">
                      <Button size="sm" variant="super">
                        <Link href="/sign-up">Register</Link>
                      </Button>
                    </li>
                  </ul>
                )}
                <SwitchTheme/>
              </div>
              {/* <div className="flex items-center gap-4">
                <MenuItems />
              </div> */}
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="m-3">
              {/* <Search hideDropdown onProfileSelected={onProfileSelected} /> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

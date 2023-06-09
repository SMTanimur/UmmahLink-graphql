"use client"
import Link from 'next/link';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MenuItems from './MenuItems';
import Search from './Search';
const Navbar = () => {
  return (
    <Disclosure
      as="header"
      className="divider sticky top-0 z-10 w-full bg-white dark:bg-black border-b-2 border-gray-200"
    >
      {({ open }) => (
        <>
          <div className="layout-container px-5">
            <div className="relative flex h-14 items-center justify-between sm:h-16">
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
                  <div className="flex items-center space-x-4">
                    <div className="hidden md:block">
                      <Search />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div></div>
              </div>
              <div className="flex items-center gap-4">
                <MenuItems />
              </div>
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

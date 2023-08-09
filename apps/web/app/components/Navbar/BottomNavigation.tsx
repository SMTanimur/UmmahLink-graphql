"use client"
import {
  BellIcon,
  HomeIcon,
  EnvelopeIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import {
  BellIcon as BellIconSolid,
  HomeIcon as HomeIconSolid,
  EnvelopeIcon as MailIconSolid,
  Squares2X2Icon as ViewGridIconSolid
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';


 export const BottomNavigation:FC = () => {
  const pathname = usePathname();
  const isActivePath = (path: string) =>pathname === path;

  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-[5] border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:hidden">
      <div className="grid grid-cols-4">
        <Link href="/" className="mx-auto my-3">
          {isActivePath('/') ? (
            <HomeIconSolid className="text-brand h-6 w-6" />
          ) : (
            <HomeIcon className="h-6 w-6" />
          )}
        </Link>
        <Link href="/explore" className="mx-auto my-3">
          {isActivePath('/explore') ? (
            <ViewGridIconSolid className="text-brand h-6 w-6" />
          ) : (
            <Squares2X2Icon className="h-6 w-6" />
          )}
        </Link>
        <Link href="/notifications" className="mx-auto my-3">
          {isActivePath('/notifications') ? (
            <BellIconSolid className="text-brand h-6 w-6" />
          ) : (
            <BellIcon className="h-6 w-6" />
          )}
        </Link>
        <Link href="/messages" className="mx-auto my-3">
          {isActivePath('/messages') ? (
            <MailIconSolid className="text-brand h-6 w-6" />
          ) : (
            <EnvelopeIcon className="h-6 w-6" />
          )}
        </Link>
      </div>
    </div>
  );
};


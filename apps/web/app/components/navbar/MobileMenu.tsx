import { Popover, Transition } from '@headlessui/react';
import {
  CogIcon,
  HomeModernIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@social-zone/client';
import { UserWithoutPassword } from '@social-zone/graphql';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '~ui';

interface MobileMenuProps {
  open: boolean;
  user: Partial<UserWithoutPassword> | any;
  closeFx: () => void;
}
type TLink = {
  href: string | ((username: string) => string);
  label: string;
  icon: ReactNode;
};

export const links: TLink[] = [
  {
    href: (username) => `/profile/${username}`,
    label: 'Your Profile',
    icon: <UserCircleIcon className="h-6 w-6" />,
  },
  {
    href: '/feed/all',
    label: 'Home',
    icon: <HomeModernIcon className="h-6 w-6" />,
  },
  {
    href: '/account/settings',
    label: 'Profile Settings',
    icon: <CogIcon className="w-6 h-6" />,
  },
];

export function MobileMenu({ open, user, closeFx }: MobileMenuProps) {
  const router = useRouter();

  const { logout } = useAuth();

  return (
    <Transition
      show={open}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Popover.Panel
        as="nav"
        className="lg:hidden flex flex-col justify-between h-full z-30"
        aria-label="Global"
      >
        <div className="border-t border-gray-200 pt-4 pb-3 mt-16">
          <Link
            href={`/profile/${user?.username}`}
            className="inline-block no-underline"
          >
            <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
              <div className="flex-shrink-0">
                {user?.avatar && (
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={user.avatar}
                    height={40}
                    width={40}
                    alt={`Profile picture of ${user?.username}`}
                  />
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-gray-100">
                  Hi! {user?.username}
                </div>
              </div>
            </div>
          </Link>
          <div className="mt-3 px-2 space-y-1">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                  href={
                    typeof link.href === 'function'
                      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                      ? link.href(user?.username!)
                      : link.href
                  }
                  key={idx}
                  onClick={() => {
                    closeFx();
                  }}
                  className="flex no-underline px-3 py-2 rounded-md text-base  hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <span className="space-x-2 flex">
                    {/* <Icon className="h-6 w-6" /> <span>{link.label}</span> */}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
            <Button
              className="mt-2"
              fullWidth
              onClick={() => {
                closeFx();
                router.push('/post/new', undefined);
              }}
              size="lg"
            >
              New Post
            </Button>
          </div>
          <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
            <Button
              variant="primary"
              className="mt-2"
              fullWidth
              size="lg"
              onClick={() => logout()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
}

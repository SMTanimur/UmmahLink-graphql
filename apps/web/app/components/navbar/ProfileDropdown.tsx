/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Avatar, Menu, MenuItem, ROUTES } from '~ui';
import {
  HomeIcon,
  SparklesIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { UserWithoutPassword } from '@social-zone/graphql';
import { useAuth } from '@social-zone/client';

interface ProfileDropdownProps {
  user: Partial<UserWithoutPassword> | any;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const { logout } = useAuth();

  return (
    <Menu
      dropdown={
        <>
          <MenuItem href={ROUTES.HOME} icon={<HomeIcon className="w-5 h-5" />}>
            Home
          </MenuItem>
          <MenuItem
            href={`/user/${user?.username}`}
            icon={<SparklesIcon className="w-5 h-5" />}
          >
            My Profile
          </MenuItem>
          <MenuItem
            href={`/account/settings`}
            icon={<Cog6ToothIcon className="w-5 h-5" />}
          >
            Profile settings
          </MenuItem>
          <MenuItem
            onClick={() => logout()}
            icon={<ArrowLeftIcon className="w-5 h-5" />}
          >
            Signout
          </MenuItem>
        </>
      }
      dropdownClassName="mr-5 mt-6"
    >
      <Avatar rounded url={user?.avatar!} />
    </Menu>
  );
}

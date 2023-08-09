"use client"

import { UserIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { FC } from 'react';

interface YourProfileProps {
  className?: string;
}

const YourProfile: FC<YourProfileProps> = ({ className = '' }) => {
  return (
    <div
      className={clsx(
        'flex w-full items-center space-x-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
    >
      <UserIcon className="h-5 w-5" />
      <div>
        <span>Your Profile</span>
      </div>
    </div>
  );
};

export default YourProfile;

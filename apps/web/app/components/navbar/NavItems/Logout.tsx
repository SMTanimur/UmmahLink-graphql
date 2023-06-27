"use client"

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@social-zone/client';
import clsx from 'clsx';
import type { FC } from 'react';

interface LogoutProps {
  onClick?: () => void;
  className?: string;
}

const Logout: FC<LogoutProps> = ({ onClick, className = '' }) => {
  const { logout: AttemtToLogout } = useAuth();

  const logout = () => {
    AttemtToLogout();
  };

  return (
    <button
      type="button"
      onClick={() => {
        logout();
        onClick?.();
      }}
      className={clsx(
        'flex w-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
    >
      <div className="flex  space-x-1.5">
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        <div>
          <span>Logout</span>
        </div>
      </div>
    </button>
  );
};

export default Logout;

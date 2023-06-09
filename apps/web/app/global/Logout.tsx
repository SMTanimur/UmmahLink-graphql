
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';
import { cn } from '~ui';


interface LogoutProps {
  onClick?: () => void;
  className?: string;
}

const Logout: FC<LogoutProps> = ({ onClick, className = '' }) => {

  const logout = () => {
   console.log('logout')
  };

  return (
    <button
      type="button"
      onClick={() => {
        logout();
        onClick?.();
      }}
      className={cn(
        'flex w-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
    >
      <div className="flex items-center space-x-1.5">
        <ArrowLeftIcon className="h-4 w-4" />
        <div>
          <span>Logout</span>
        </div>
      </div>
    </button>
  );
};

export default Logout;

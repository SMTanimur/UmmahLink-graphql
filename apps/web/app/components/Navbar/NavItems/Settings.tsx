"use client"
import clsx from 'clsx';
import type { FC } from 'react';

interface SettingsProps {
  className?: string;
}

const Settings: FC<SettingsProps> = ({ className = '' }) => {
  return (
    <div
      className={clsx(
        'flex w-full items-center space-x-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
    >
      {/* <CogIcon className="h-4 w-4" /> */}
      <div>
        <span>Settings</span>
      </div>
    </div>
  );
};

export default Settings;

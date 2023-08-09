"use client"
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';;

import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { cn } from '~ui';


interface ThemeSwitchProps {
  onClick?: () => void;
  className?: string;
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ onClick, className = '' }) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className={cn(
        'flex w-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        
        onClick?.();
      }}
    >
      <div className="flex items-center space-x-1.5">
        {theme === 'light' ? (
          <>
            <MoonIcon className="h-4 w-4" />
            <div>
              <span>Dark mode</span>
            </div>
          </>
        ) : (
          <>
            <SunIcon className="h-4 w-4" />
            <div>
              <span>Light mode</span>
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default ThemeSwitch;

'use client';

import React from 'react';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { Button, cn } from '~ui';
const SwitchTheme = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div>
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        size="sm"
        className={cn(
          theme === 'dark'
            ? '!bg-gray-800 hover:!bg-gray-800/20  '
            : '!bg-gray-100 hover:!bg-gray-100/20 ',
          '!rounded-full !w-12 !h-12 !ring-0 !border-none !outline-none'
        )}
      >
        {theme === 'dark' ? (
          <MoonIcon className="text-[cyan]  h-6 w-6" />
        ) : (
          <SunIcon className="text-orange-400  h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default SwitchTheme;

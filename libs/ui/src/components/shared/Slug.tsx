"use client"
import type { FC } from 'react';
import { cn } from '../../lib';

interface SlugProps {
  slug: string;
  prefix?: string;
  className?: string;
}

export const Slug: FC<SlugProps> = ({ slug, prefix, className = '' }) => {
  return (
    <span
      className={cn(
        'from-brand-600 dark:from-brand-400 bg-gradient-to-r to-pink-600 bg-clip-text text-transparent dark:to-pink-400',
        className
      )}
    >
      {prefix}
      {slug}
    </span>
  );
};



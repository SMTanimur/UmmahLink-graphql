"use client"

import { LifebuoyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';
import { cn } from '~ui';

interface ContactProps {
  onClick?: () => void;
  className?: string;
}

const Contact: FC<ContactProps> = ({ onClick, className = '' }) => {
  return (
    <Link
      href="/contact"
      className={cn(
        'flex w-full items-center space-x-1.5 px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
      onClick={onClick}
    >
      <LifebuoyIcon className="h-4 w-4" />
      <div>
        <span>Contact</span>
      </div>
    </Link>
  );
};

export default Contact;

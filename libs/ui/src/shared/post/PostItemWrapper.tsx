"use client"
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

interface PostItemWrapperProps {
  className?: string;
  children: ReactNode[];
}

export const PostItemWrapper: FC<PostItemWrapperProps> = ({
  className = '',
  children
}) => {
 

  return (
    <article
      className={clsx(className)}
      
      aria-hidden="true"
    >
      {children}
    </article>
  );
};



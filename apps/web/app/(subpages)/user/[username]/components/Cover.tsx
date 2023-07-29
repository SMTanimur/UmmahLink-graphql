"use client"
import type { FC } from 'react';
import colors from 'tailwindcss/colors';
import { STATIC_IMAGES_URL } from '~ui';


interface CoverProps {
  cover: string | null;
}

const Cover: FC<CoverProps> = ({ cover }) => {
  return (
    <div
      className="h-52 sm:h-80"
      data-testid="profile-cover"
      style={{
        backgroundImage: `url(${
          cover
            ? cover
            : `${STATIC_IMAGES_URL}/patterns/2.svg`
        })`,
        backgroundColor: colors.violet[500],
        backgroundSize: cover ? 'cover' : '30%',
        backgroundPosition: 'center center',
        backgroundRepeat: cover ? 'no-repeat' : 'repeat'
      }}
    />
  );
};

export default Cover;

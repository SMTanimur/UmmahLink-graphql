"use client"
import Link from 'next/link';
import type { FC } from 'react';

interface AppVersionProps {
  onClick?: () => void;
}

const AppVersion: FC<AppVersionProps> = ({ onClick }) => {
  return (
    <div className="px-6 py-3 text-xs">
      <Link
        href={`https://github.com/SMTanimur/UmmahLink-graphql/releases/tag/v2.0.0`}
        className="font-mono"
        target="_blank"
        rel="noreferrer noopener"
        onClick={onClick}
      >
        v2
      </Link>
    </div>
  );
};

export default AppVersion;

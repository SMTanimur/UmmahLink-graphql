import type { FC } from 'react';

export const PostContentShimmer: FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="shimmer h-3 w-7/12 rounded-lg" />
        <div className="shimmer h-3 w-1/3 rounded-lg" />
      </div>
    </div>
  );
};



'use client';

import { GetLikeResponse } from '@social-zone/graphql';
import Link from 'next/link';
import  { FC, useState } from 'react';
import { Image, Slug } from '../components';
import { cn, sanitizeDisplayName } from '../lib';
import { useProfileQuery } from '../hooks';
import { Unfollow } from './Unfollow';
import { Follow } from './Follow';
import { UserAvatarUrl } from '../data';
interface UserInfoProps {
  profile: GetLikeResponse;
  isBig?: boolean;
}
const UserInfo: FC<UserInfoProps> = ({ profile, isBig }) => {
  const [following, setFollowing] = useState(profile.isFollowing);
  const { data } = useProfileQuery();

  const UserAvatar = () => (
    <Image
      src={profile?.avatar?.avatarUrl ? profile?.avatar?.avatarUrl : UserAvatarUrl}
      loading="lazy"
      className={cn(
        isBig ? 'h-14 w-14' : 'h-10 w-10',
        'rounded-full border bg-gray-200 dark:border-gray-700'
      )}
      height={isBig ? 56 : 40}
      width={isBig ? 56 : 40}
      alt={profile?.username as any}
    />
  );


  const UserName = () => (
    <>
      <div className="flex max-w-sm items-center">
        <div className={cn(isBig ? 'font-bold' : 'text-md', 'grid')}>
          <div className="truncate">
            {sanitizeDisplayName(profile?.name) ??
              profile?.name}
          </div>
        </div>
      </div>
      <div>
        <Slug
          className="text-sm"
          slug={profile?.username as any}
          prefix="@"
        />
      </div>
    </>
  );
  return (
    <div className="relative flex items-center justify-between px-4 py-2">
      <Link href={`/user/${profile.username}`} className="hover:opacity-80">
        <div className="flex items-center">
          <UserAvatar />
          <div className="flex flex-col">
            <UserName/>
          </div>
        </div>
      </Link>
      <div className="absolute px-4 bg-white dark:bg-transparent right-0 top-0 bottom-0 my-auto flex items-center">
        {profile?.username === data?.me.username ? (
          <h4 className="text-gray-400">Me</h4>
        ) : following ? (
          <Unfollow
            profile={profile as any}
            setFollowing={setFollowing}
          />
        ) : (
            <Follow
              profile={profile as any}
              setFollowing={setFollowing}
            />
        )}
      </div>
    </div>
  );
};

export default UserInfo;


"user client"
import { IUser, Pagination, ProfileInformation } from '@social-zone/graphql';
import Link from 'next/link';
import type { FC } from 'react';
import { memo, useState } from 'react';
import { Follow, Image, Slug, UserPreview, cn, sanitizeDisplayName } from '~ui';


interface UserProfileProps {
  profile: Pagination 
  followStatusLoading?: boolean;
  isFollowing?: boolean;
  isBig?: boolean;
  linkToProfile?: boolean;
  showBio?: boolean;
  showFollow?: boolean;
  showStatus?: boolean;
  showUserPreview?: boolean;
  timestamp?: Date;

  // For data analytics
  followUnfollowPosition?: number;
  followUnfollowSource?: string;
}

const UserProfile: FC<UserProfileProps> = ({
  profile,
  followStatusLoading = false,
  isFollowing = false,
  isBig = false,
  linkToProfile = true,
  showBio = false,
  showFollow = false,
  showStatus = false,
  showUserPreview = true,
  timestamp = '',
  followUnfollowPosition,
  followUnfollowSource
}) => {
  const [following, setFollowing] = useState(isFollowing);
  

  const UserAvatar = () => (
    <Image
      src={profile?.avatar}
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
        {/* {isVerified(profile?.id) && (
          <BadgeCheckIcon className="text-brand ml-1 h-4 w-4" />
        )} */}
      </div>
      <div>
        <Slug
          className="text-sm"
          slug={profile?.username as any}
          prefix="@"
        />
        {timestamp ? (
          <span className="lt-text-gray-500">
            <span className="mx-1.5">·</span>
            {/* <span className="text-xs" title={formatTime(timestamp as Date)}>
              {getTwitterFormat(timestamp)}
            </span> */}
          </span>
        ) : null}
      </div>
    </>
  );

  const UserInfo: FC = () => {
    return (
      <UserPreview
        isBig={isBig}
        profile={profile as ProfileInformation}
        followStatusLoading={followStatusLoading}
        showUserPreview={showUserPreview}
      >
        <div className="mr-8 flex items-center space-x-3">
          <UserAvatar />
          <div>
            <UserName />
            {showBio && profile?.info && (
              <div
                // Replace with Tailwind
                style={{ wordBreak: 'break-word' }}
                className={cn(
                  isBig ? 'text-base' : 'text-sm',
                  'mt-2',
                  'linkify leading-6'
                )}
              >
                {/* <Markup>{profile?.bio}</Markup> */}
              </div>
            )}
          </div>
        </div>
      </UserPreview>
    );
  };

  return (
    <div
      className="flex items-center justify-between"
      data-testid={`user-profile-${profile.id}`}
    >
      {linkToProfile ? (
        <Link href={`/user/${profile?.username}`}>
          <UserInfo />
        </Link>
      ) : (
        <UserInfo />
      )}
      {showFollow &&
        
          (
            <Follow
            profile={profile as ProfileInformation}
            setFollowing={setFollowing}
          />
          )
       }
    </div>
  );
};

export default memo(UserProfile);

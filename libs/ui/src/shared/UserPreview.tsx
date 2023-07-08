"use client"
import {  ProfileInformation,  useUserProfileQuery } from "@social-zone/graphql";
import { FC, ReactNode, useState } from "react";
import { Image, Slug } from "../components";
import { cn, nFormatter, sanitizeDisplayName, stopEventPropagation } from "../lib";
import { Follow } from "./Follow";
import Tippy from "@tippyjs/react";


interface UserPreviewProps {
  profile: ProfileInformation;
  children: ReactNode;
  isBig?: boolean;
  followStatusLoading?: boolean;
  showUserPreview?: boolean;
}

export const UserPreview: FC<UserPreviewProps> = ({
  profile,
  isBig,
  followStatusLoading,
  children,
  showUserPreview = true
}) => {
  const [lazyProfile, setLazyProfile] = useState(profile);
  const [following, setFollowing] = useState(profile?.isFollowing);

  const {data}=useUserProfileQuery({username:lazyProfile?.username})

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
      alt={profile.username as any}
    />
  );

  const UserName = () => (
    <>
      <div className="flex max-w-sm items-center gap-1 truncate">
        <div className={cn(isBig ? 'font-bold' : 'text-md')}>
          {sanitizeDisplayName(lazyProfile?.name) ??
           profile?.name}
        </div>
        {/* {isVerified(lazyProfile?.id) && (
          <BadgeCheckIcon className="text-brand h-4 w-4" />
        )} */}
      </div>
      {/* <Slug
        className="text-sm"
        slug={profile?.username as any}
        prefix="@"
      /> */}
    </>
  );

  const Preview = () => (
    <>
      <div className="flex items-center justify-between">
        <UserAvatar />
        {/* <div onClick={stopEventPropagation} aria-hidden="true">
          {!profile.isFollowing &&
            (followStatusLoading ? (
              <div className="shimmer h-8 w-10 rounded-lg" />
            ) :  (
              <Follow
                profile={profile as ProfileInformation}
                setFollowing={setFollowing}
              />
            ))}
        </div> */}
      </div>
      <div className="space-y-3 p-1">
        <UserName />
        {/* <div>
          {profile. && (
            <div
              className={cn(
                isBig ? 'text-base' : 'text-sm',
                'mt-2',
                'linkify break-words leading-6'
              )}
            >
              <Markup>{lazyProfile?.bio}</Markup>
            </div>
          )}
        </div> */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="text-base">
              {nFormatter(profile?.followingCount as number)}
            </div>
            <div className="lt-text-gray-500 text-sm">
               <h6>Following</h6>
            </div>
          </div>
          <div className="text-md flex items-center space-x-1">
            <div className="text-base">
              {nFormatter(profile?.followersCount as number)}
            </div>
            <div className="lt-text-gray-500 text-sm">
              <h6>Followers</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const onPreviewStart = async () => {
    if (!lazyProfile.id) {
     
    
      const getProfile = data?.user
      if (getProfile) {
        setLazyProfile(getProfile as ProfileInformation);
      }
    }
  };

  return showUserPreview ? (
    <span onMouseOver={onPreviewStart} onFocus={onPreviewStart}>
      {lazyProfile?.id ? (
        <Tippy
          placement="bottom-start"
          delay={[800, 0]}
          hideOnClick={false}
          content={<Preview />}
          arrow={false}
          interactive
          zIndex={1000}
          className="hidden w-64 !rounded-xl border !bg-white !px-1.5 !py-3 !text-black dark:border-gray-700 dark:!bg-black dark:!text-white md:block"
          appendTo={() => document.body}
        >
          <span>{children}</span>
        </Tippy>
      ) : (
        <span>{children}</span>
      )}
    </span>
  ) : (
    <span>{children}</span>
  );
};



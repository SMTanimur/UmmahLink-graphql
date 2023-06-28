import { CogIcon } from '@heroicons/react/24/outline';
import { ProfileInformation } from '@social-zone/graphql';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, useState } from 'react';
import { Button, Follow, Image, LightBox, Slug, Unfollow } from '~ui';
import Followerings from './Followerings';
import { useProfileQuery } from '@social-zone/client';

interface DetailsProps {
  profile: ProfileInformation;
  following: boolean;
  setFollowing: Dispatch<boolean>;
}

const Details: FC<DetailsProps> = ({ profile, following, setFollowing }) => {
  const { data } = useProfileQuery();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  // const { persistProfile } = useMessageDb();
  // const setSelectedTab = useMessageStore((state) => state.setSelectedTab);

  // const onMessageClick = () => {
  //   if (!currentProfile) {
  //     return;
  //   }
  //   const conversationId = buildConversationId(currentProfile.id, profile.id);
  //   const conversationKey = buildConversationKey(
  //     profile.ownedBy,
  //     conversationId
  //   );
  //   persistProfile(conversationKey, profile);
  //   const selectedTab: TabValues = profile.isFollowedByMe
  //     ? MessageTabs.Lens
  //     : MessageTabs.Requests;
  //   setSelectedTab(selectedTab);
  //   router.push(`/messages/${conversationKey}`);
  // };

  return (
    <div className="mb-4 space-y-5 px-5 sm:px-0">
      <div className="relative -mt-24 h-32 w-32 sm:-mt-32 sm:h-52 sm:w-52">
        <Image
          onClick={() => setExpandedImage(profile?.avatar)}
          src={profile?.avatar}
          className="h-32 w-32 cursor-pointer rounded-xl bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-52 sm:w-52"
          height={128}
          width={128}
          alt={profile?.name}
          data-testid="profile-avatar"
        />
        <LightBox
          show={Boolean(expandedImage)}
          url={expandedImage}
          onClose={() => setExpandedImage(null)}
        />
      </div>
      <div className="space-y-1 py-2">
        <div className="flex items-center gap-1.5 text-2xl font-bold">
          <div className="truncate" data-testid="profile-name">
            {profile?.name}
          </div>
          {/* {isVerified(profile?.id) && (
            <Tooltip content={t`Verified`}>
              <BadgeCheckIcon
                className="text-brand h-6 w-6"
                data-testid="profile-verified-badge"
              />
            </Tooltip>
          )} */}
        </div>
        <div
          className="flex items-center space-x-3"
          data-testid="profile-handle"
        >
          {profile?.name ? (
            <Slug
              className="text-sm sm:text-base"
              slug={profile?.username as any}
              prefix="@"
            />
          ) : (
            <Slug
              className="text-sm sm:text-base"
              slug={profile?.username as any}
            />
          )}

          {data?.me && data.me?._id !== profile?.id && profile?.isFollowing && (
            <div className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
              <span>Follows you</span>
            </div>
          )}
        </div>
      </div>
      {profile?.info && (
        <div
          className="markup linkify text-md mr-0 break-words sm:mr-10"
          data-testid="profile-bio"
        >
          <span>{profile?.info?.bio}</span>
        </div>
      )}
      <div className="space-y-5">
        <Followerings profile={profile} />
        <div>
          {data?.me?._id === profile?.id ? (
            <Link href="/settings">
              <Button
                variant="secondary"
                icon={<CogIcon className="h-5 w-5" />}
                outline
              >
                <span>Edit Profile</span>
              </Button>
            </Link>
          ) : profile?.isFollowing ? (
            <div className="flex space-x-2">
              <Unfollow
                profile={profile}
                setFollowing={setFollowing}
                showText
              />
              {/* {currentProfile && <Message onClick={onMessageClick} />} */}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Follow profile={profile} setFollowing={setFollowing} showText />
              {/* {currentProfile && <Message onClick={onMessageClick} />} */}
            </div>
          )}
        </div>
        {/* {currentProfile?.id !== profile?.id && (
          <>
            <MutualFollowers
              setShowMutualFollowersModal={setShowMutualFollowersModal}
              profile={profile}
            />
            <Modal
              title={t`Followers you know`}
              icon={<UsersIcon className="text-brand h-5 w-5" />}
              show={showMutualFollowersModal}
              onClose={() => setShowMutualFollowersModal(false)}
            >
              <MutualFollowersList profileId={profile?.id} />
            </Modal>
          </>
        )} */}
      </div>
    </div>
  );
};

export default Details;

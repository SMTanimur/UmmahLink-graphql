'use client';

import { CameraIcon, CogIcon } from '@heroicons/react/24/outline';
import {
  ProfileInformation,
  useMeQuery,
  useProfileUpdateMutation,
} from '@social-zone/graphql';
import { uploadImage } from '@social-zone/client';
import Link from 'next/link';
import { Dispatch, FC, useState } from 'react';
import {
  Button,
  CropProfileModal,
  ErrorMessage,
  Follow,
  IImage,
  Image,
  LightBox,
  Modal,
  Slug,
  Unfollow,
  UserAvatarUrl,
  useFileHandler,
} from '~ui';
import Followerings from './Followerings';
import { useProfileQuery } from '~ui';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface DetailsProps {
  profile: ProfileInformation;
  following: boolean;
  setFollowing: Dispatch<boolean>;
}

const initImageState = { id: '', file: null, url: '' };

const Details: FC<DetailsProps> = ({ profile, following, setFollowing }) => {
  const { data } = useProfileQuery();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);
  const profilePicture = useFileHandler<IImage>('single', initImageState);
  const [cropModal, setCropModal] = useState(false);
  const queryClient = useQueryClient();
  const isOwnProfile = profile?.isOwnProfile;

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

  const handleProfilePictureFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    profilePicture.onFileChange(e, () => {
      setCropModal(true);
    });
  };

  const { mutateAsync } = useProfileUpdateMutation();

  const onCropSuccessCallback = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      toast('Uploading...', { icon: '📤' });
      const { data } = await uploadImage(formData);
      const avatarData = {
        avatar: {
          avatarPublicId: data.image.img_id,
          avatarUrl: data.image.img_src,
        },
      };

      toast.dismiss();

      await mutateAsync(
        { updateUserInput: avatarData, username: profile.username as string },
        {
          onSuccess: ({ updateUser: { message } }) => {
            queryClient.invalidateQueries(useMeQuery.getKey());
            queryClient.invalidateQueries(['UserProfile']);
            toast.success(message);
          },
          onError: (error: any) => {
            return (
              <ErrorMessage
                className="mb-3"
                title=" Like failed!"
                error={{
                  name: ' Like failed!',
                  message: error.message,
                }}
              />
            );
          },
        }
      );
    } catch (error) {
      toast.error('Failed to update profile picture.');
    }
  };

  return (
    <div className="mb-4 space-y-5 px-5 sm:px-0">
      <div className="relative -mt-24 h-32 w-32 sm:-mt-32 sm:h-52 sm:w-52">
        <Image
          onClick={() =>
            setExpandedImage(
              profile?.avatar?.avatarUrl
                ? profile?.avatar?.avatarUrl
                : UserAvatarUrl
            )
          }
          src={
            profile?.avatar?.avatarUrl
              ? profile?.avatar?.avatarUrl
              : UserAvatarUrl
          }
          className="h-32 w-32 cursor-pointer rounded-xl bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-52 sm:w-52"
          height={128}
          width={128}
          alt={profile?.name}
          data-testid="profile-avatar"
        />
        {isOwnProfile && (
          <div>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfilePictureFileChange}
              readOnly={isUploadingProfileImage}
              id="picture"
            />
            <label htmlFor="picture">
              <div className="flex items-center w-10 h-10 justify-center cursor-pointer p-2 bg-indigo-700 rounded-full absolute bottom-1 laptop:bottom-0 left-0 hover:bg-indigo-800">
                <CameraIcon className=" h-7 w-7 flex items-center justify-center text-white" />
              </div>
            </label>
          </div>
        )}

        <LightBox
          show={Boolean(expandedImage)}
          url={expandedImage}
          onClose={() => setExpandedImage(null)}
        />
      </div>

      <div className="space-y-1 py-2 mt-5">
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
      {profile && (
        <div
          className="markup linkify text-md mr-0 break-words sm:mr-10"
          data-testid="profile-bio"
        >
          <span>{profile?.bio}</span>
        </div>
      )}
      <div className="space-y-5">
        <Followerings profile={profile} />
        <div>
          {data?.me?._id === profile?.id ? (
            <Link href={`/user/${profile?.username}/setting`}>
              <Button
                variant='super'
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
      <Modal
        title={`Avatar`}
        show={cropModal}
        onClose={() => setCropModal(false)}
      >
        <CropProfileModal
          file={profilePicture.imageFile}
          onClose={() => setCropModal(false)}
          onCropSuccessCallback={onCropSuccessCallback}
        />
      </Modal>
    </div>
  );
};

export default Details;

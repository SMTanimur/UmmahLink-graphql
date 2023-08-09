'use client';

import {
  ProfileInformation,
  useMeQuery,
  useProfileUpdateMutation,
} from '@social-zone/graphql';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  ErrorMessage,
  GridItemEight,
  GridItemFour,
  GridLayout,
  IImage,
  NewPost,
  PostItem,
  ProfilePostType,
  STATIC_IMAGES_URL,
  useAuth,
  useFileHandler,
  usePostQuery,
  useProfileQuery,
  useUserProfile,
  useWindowDimensions,
} from '~ui';
import Cover from './components/Cover';
import Details from './components/Details';
import FeedType from './components/FeedType';
import Followers from './components/Followers';
import Following from './components/Following';
import Info from './components/Info';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { toast } from 'react-hot-toast';
import { uploadImage } from '@social-zone/client';
import { useQueryClient } from '@tanstack/react-query';
import CoverPhotoOverlay from './components/CoverPhotoOverlay';

type UserComponentProps = {
  username: string;
  type: string;
};

const initImageState = { id: '', file: null, url: '' };
export default function UserComponent({ username, type }: UserComponentProps) {
  const { isAuthenticated } = useAuth();
  const { data } = useUserProfile(username);
  const [isUploadingCoverPhoto, setIsUploadingCoverPhoto] = useState(false);
  const coverPhotoOverlayRef = useRef<HTMLDivElement | null>(null);
  const coverPhotoRef = useRef<HTMLDivElement | null>(null);
  const coverPhoto = useFileHandler<IImage>('single', initImageState);

  const { width } = useWindowDimensions();
  const screan = width >= 800;
  const {
    data: post,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = usePostQuery(
    {
      option: { limit: 5 },
      query: {},
      username: data?.user?.username as string,
    },
    {
      // Infinite query
      getNextPageParam: (lastPage) => {
        return lastPage?.getPosts?.nextPage;
      },
    }
  );
  const PostsData = post?.pages.flatMap((page) => page.getPosts?.docs) ?? [];
  const queryClient = useQueryClient();
  const { data: me } = useProfileQuery();
  const profile = data?.user;
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: () => fetchNextPage(),
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });
  const [following, setFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    const cp = coverPhotoRef.current;
    const cpo = coverPhotoOverlayRef.current;

    if (cp && cpo && data?.user?.isOwnProfile && window.screen.width > 800) {
      cp.addEventListener('mouseover', overlayOnMouseOver);
      cp.addEventListener('mouseout', overlayOnMouseOut);
    }

    return () => {
      if (cp && cpo) {
        cp.removeEventListener('mouseover', overlayOnMouseOver);
        cp.removeEventListener('mouseout', overlayOnMouseOut);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coverPhoto.imageFile.file,
    isUploadingCoverPhoto,
    data?.user?.isOwnProfile,
  ]);

  const overlayOnMouseOver = () => {
    if (!isUploadingCoverPhoto && coverPhotoOverlayRef.current) {
      coverPhotoOverlayRef.current.style.visibility = 'visible';
    }
  };

  const overlayOnMouseOut = () => {
    if (
      !isUploadingCoverPhoto &&
      !coverPhoto.imageFile.file &&
      coverPhotoOverlayRef.current
    ) {
      coverPhotoOverlayRef.current.style.visibility = 'hidden';
    }
  };
  const { mutateAsync } = useProfileUpdateMutation();

  const handleSaveCoverPhoto = async () => {
    if (coverPhoto.imageFile.file) {
      const formData = new FormData();
      formData.append('files', coverPhoto.imageFile.file);

      try {
        setIsUploadingCoverPhoto(true);
        toast('Uploading Cover Photo...');

        const { data } = await uploadImage(formData);
        const coverData = {
          coverPicture: {
            coverPublicId: data.image.img_id,
            coverUrl: data.image.img_src,
          },
        };
        await mutateAsync(
          { updateUserInput: coverData, username: profile?.username as string },
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
                  title=" update failed!"
                  error={{
                    name: ' update failed!',
                    message: error?.message,
                  }}
                />
              );
            },
          }
        );
        toast.dismiss();

        setIsUploadingCoverPhoto(false);

        coverPhoto.clearFiles();
      } catch (e: any) {
        console.log(e);
        setIsUploadingCoverPhoto(false);
        toast.error(e.error?.message);
      }
    }
  };
  const [feedType, setFeedType] = useState(
    type && ['feed', 'info', 'following', 'followers'].includes(type as string)
      ? type.toString().toUpperCase()
      : ProfilePostType
  );
  return (
    <>
      {data?.user && (
        <div
          className="w-full h-60 mb-8 md:mb-0 md:h-80 bg-gray-200 dark:bg-gray-800 relative overflow-hidden"
          ref={coverPhotoRef}
        >
          <CoverPhotoOverlay
            coverPhotoOverlayRef={coverPhotoOverlayRef}
            coverPhoto={coverPhoto}
            isUploadingCoverPhoto={isUploadingCoverPhoto}
            isOwnProfile={profile?.isOwnProfile as boolean}
            handleSaveCoverPhoto={handleSaveCoverPhoto}
          />
          <Cover
            cover={
              coverPhoto.imageFile.url ||
              (profile?.coverPicture?.coverUrl as string) ||
              `${STATIC_IMAGES_URL}/patterns/2.svg`
            }
          />
        </div>
      )}

      <GridLayout className="pt-6">
        <GridItemFour>
          <Details
            profile={data?.user as ProfileInformation}
            following={Boolean(following)}
            setFollowing={setFollowing}
          />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          <FeedType setFeedType={setFeedType} feedType={feedType as string} />
          {me?.me?._id === data?.user?.id ? <NewPost /> : null}

          {feedType === ProfilePostType.Followers ? (
            <Followers profile={data?.user as ProfileInformation} />
          ) : feedType === ProfilePostType.Following ? (
            <Following profile={data?.user as ProfileInformation} />
          ) : feedType === ProfilePostType.Info ? (
            <Info profile={data?.user as ProfileInformation} />
          ) : (
            <>
              {PostsData?.map(
                (post: any, index) =>
                  post?.author && ( // avoid render posts with null author
                    <PostItem
                      key={index}
                      post={post!}
                      isAuth={isAuthenticated}
                    />
                  )
              )}

              {hasNextPage ? (
                <div className="flex flex-col items-center justify-center ">
                  <Button
                    ref={sentryRef}
                    className="h-11 text-sm font-semibold md:text-base items-center "
                  >
                    Loading More
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <p className="text-sm text-gray-400">
                    There is no post to show
                  </p>
                </div>
              )}
            </>
          )}
        </GridItemEight>
      </GridLayout>
    </>
  );
}

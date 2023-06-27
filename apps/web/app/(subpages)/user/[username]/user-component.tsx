"use client"

import { ProfileInformation, useUserProfileQuery } from "@social-zone/graphql";
import { useState } from "react";
import { GridItemFour, GridLayout, ProfilePostType, STATIC_IMAGES_URL } from "~ui";
import Cover from "./components/Cover";
import Details from "./components/Details";

type UserComponentProps = {
   username: string;
    type: string;
}
export default function UserComponent( { username,type } : UserComponentProps) {

  const {data}= useUserProfileQuery({username})
  const [following, setFollowing] = useState<boolean | null>(null);

  const [postType, setPostType] = useState(
    type &&
      ['posts', 'info', 'friends'].includes(type as string)
      ? type.toString().toUpperCase()
      : ProfilePostType.Post
  );
  return (
    <>

    {
      data?.user && (
        <Cover
        cover={
          data?.user?.coverPicture
            ? data?.user?.coverPicture
            : `${STATIC_IMAGES_URL}/patterns/2.svg`
        }
      />
      )
    }
      
      <GridLayout className="pt-6">
        <GridItemFour>
          <Details
            profile={data?.user as ProfileInformation}
            following={Boolean(following)}
            setFollowing={setFollowing}
          />
        </GridItemFour>
        {/* <GridItemEight className="space-y-5">
          <FeedType setFeedType={setFeedType} feedType={feedType} />
          {currentProfile?.id === profile?.id ? <NewPost /> : null}
          {(feedType === ProfileFeedType.Feed ||
            feedType === ProfileFeedType.Replies ||
            feedType === ProfileFeedType.Media ||
            feedType === ProfileFeedType.Collects) && (
            <Feed profile={profile as Profile} type={feedType} />
          )}
          {feedType === ProfileFeedType.Nft ? (
            isNftGalleryEnabled ? (
              <NftGallery profile={profile as Profile} />
            ) : (
              <NftFeed profile={profile as Profile} />
            )
          ) : null}
        </GridItemEight> */}
      </GridLayout>
    </>
  )
}
"use client"

import { ProfileInformation, useUserProfileQuery } from "@social-zone/graphql";
import { useState } from "react";
import { GridItemEight, GridItemFour, GridLayout, NewPost, ProfilePostType, STATIC_IMAGES_URL, useProfileQuery } from "~ui";
import Cover from "./components/Cover";
import Details from "./components/Details";
import FeedType from "./components/FeedType";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Info from "./components/Info";

type UserComponentProps = {
   username: string;
    type: string;
}
export default function UserComponent( { username,type } : UserComponentProps) {

  const {data}= useUserProfileQuery({username})
  const [following, setFollowing] = useState<boolean | null>(null);
  const {data:me}=useProfileQuery()
  console.log(data?.user)

  const [feedType, setFeedType] = useState(
    type &&
      ['feed', 'info', 'following','followers'].includes(type as string)
      ? type.toString().toUpperCase()
      : ProfilePostType
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
        <GridItemEight className="space-y-5">
          <FeedType setFeedType={setFeedType} feedType={feedType as string} />
          {me?.me?._id === data?.user?.id ? <NewPost /> : null}
   
          {
            feedType ===  ProfilePostType.Followers ? 
            (
            <Followers profile={data?.user as ProfileInformation }/>
            )
            : feedType === ProfilePostType.Following ? 
            (
              <Following profile={data?.user as ProfileInformation }/>
            )
            : feedType === ProfilePostType.Info ?
            (
              <Info profile={data?.user as ProfileInformation}/>
            )
            :
            null
        
          }
          {/* {(feedType === ProfilePostType.Post ||
            feedType === ProfilePostType.Followers ||
            feedType === ProfilePostType.Following) && (
            <Feed profile={profile as Profile} type={feedType} />
          )} */}
        </GridItemEight>
      </GridLayout>
    </>
  )
}
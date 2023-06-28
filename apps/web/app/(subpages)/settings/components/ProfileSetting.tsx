"use client"

import { useProfileQuery } from '@social-zone/client';
import { IUser, useUserProfileQuery } from '@social-zone/graphql';
import React, { useState } from 'react'
import { Card, GridItemEight, GridItemFour, GridLayout, PageLoading, TabButton } from '~ui';
import { SettingsSidebar } from './Sidebar';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Picture from './Picture';
import ProfileSettingsForm from './ProfileForm';

const ProfileSettingComponent = () => {
  const {data}=useProfileQuery()
  const currentProfile = data?.me
  const [settingsType, setSettingsType] = useState<'NFT' | 'AVATAR'>('AVATAR');

  const {data:userData,isLoading} = useUserProfileQuery({username:currentProfile?.username as any})

  // if (error) {
  //   return <Custom500 />;
  // }

  if (isLoading) {
    return <PageLoading message={`Loading settings`} />;
  }

  // if (!currentProfile) {
  //   return <Custom404 />;
  // }

  const profile = userData?.user

  return (
    <GridLayout>
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <ProfileSettingsForm profile={profile as any} />
        <Card className="space-y-5 p-5">
          <div className="flex items-center space-x-2">
            <TabButton
              name="Upload avatar"
              icon={<PhotoIcon className="h-5 w-5" />}
              active={settingsType === 'AVATAR'}
              onClick={() => setSettingsType('AVATAR')}
            />
          </div>
         
            <Picture profile={profile as any} />
        
        </Card>
      </GridItemEight>
    </GridLayout>
  );
}

export default ProfileSettingComponent
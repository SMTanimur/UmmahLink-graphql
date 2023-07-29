'use client';

import { useProfileQuery } from '~ui';
import { useUserProfileQuery } from '@social-zone/graphql';
import React from 'react';
import { GridItemEight, GridItemFour, GridLayout, PageLoading } from '~ui';
import { SettingsSidebar } from './Sidebar';

import ProfileSettingsForm from './ProfileForm';

const ProfileSettingComponent = () => {
  const { data } = useProfileQuery();
  const currentProfile = data?.me;
  const { data: userData, isLoading } = useUserProfileQuery({
    username: currentProfile?.username as any,
  });

  // if (error) {
  //   return <Custom500 />;
  // }

  if (isLoading) {
    return <PageLoading message={`Loading settings`} />;
  }

  // if (!currentProfile) {
  //   return <Custom404 />;
  // }

  const profile = userData?.user;

  return (
    <GridLayout>
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <ProfileSettingsForm profile={profile as any} />
      </GridItemEight>
    </GridLayout>
  );
};

export default ProfileSettingComponent;

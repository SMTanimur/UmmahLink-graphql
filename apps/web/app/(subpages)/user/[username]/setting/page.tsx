import React from 'react'
import ProfileSettingComponent from './components/ProfileSetting'
import { Metadata } from 'next';

function ProfileSetting() {
  return (
    <>
    <ProfileSettingComponent/>
    </>
  )
}

export default ProfileSetting

export const metadata: Metadata = {
  title: 'Settings',
};
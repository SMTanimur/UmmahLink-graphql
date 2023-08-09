"use client"
import { ProfileInformation } from '@social-zone/graphql';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { Card, useProfileQuery } from '~ui';

interface InfoProps {
  profile: ProfileInformation
}

const Info:FC<InfoProps> = ({profile}) => {
  const {data}=useProfileQuery()
 


  const {push}=useRouter()

  const isOwnProfile = data?.me?.username === profile?.username
  return (
    <Card className='pl-6 py-3'>
      <div className="flex justify-between">
        <h3 className="text-gray-500 dark:text-white">Info</h3>
        {isOwnProfile && (
          <span
            className="underline cursor-pointer text-indigo-700 dark:text-indigo-400 pr-4"
            onClick={() => push(`/user/${profile?.username}/setting`)}
          >
            Edit
          </span>
        )}
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800 space-y-4 mt-8">
        <div className="grid grid-cols-3 py-4">
          <h5 className="dark:text-white"> Name</h5>
          {profile?.name ? (
            <span className="text-gray-600 dark:text-gray-400 col-span-2">{profile?.name}</span>
          ) : (
            <span className="text-gray-300 italic">Name not set.</span>
          )}
        </div>
        <div className="grid grid-cols-3 py-4">
          <h5 className="dark:text-white">Username</h5>
          <span className="text-gray-600 dark:text-gray-400 col-span-2">{profile?.username}</span>
        </div>
        {isOwnProfile && (
          <div className="grid grid-cols-3 py-4">
            <h5 className="dark:text-white">Email Address</h5>
            <span className="text-gray-600 dark:text-gray-400 col-span-2">{profile?.email}</span>
          </div>
        )}
        <div className="grid grid-cols-3 py-4">
          <h5 className="dark:text-white">Gender</h5>
          {profile?.gender ? (
            <span className="text-gray-600 dark:text-gray-400 col-span-2 capitalize">{profile?.gender}</span>
          ) : (
            <span className="text-gray-300 italic">Gender not set.</span>
          )}
        </div>
        <div className="grid grid-cols-3 py-4">
          <h5 className="dark:text-white">Birthday</h5>
          {profile?.birthday ? (
            <span className="text-gray-600 dark:text-gray-400 col-span-2">{dayjs(profile?.birthday).format('MMM.DD, YYYY')}</span>
          ) : (
            <span className="text-gray-300 italic">Birthday not set.</span>
          )}
        </div>
        <div className="grid grid-cols-3 py-4">
          <h5 className="dark:text-white">Bio</h5>
          {profile?.bio ? (
            <span className="text-gray-600 dark:text-gray-400 col-span-2">{profile?.bio}</span>
          ) : (
            <span className="text-gray-300 italic">Bio not set.</span>
          )}
        </div>
        {/* <div className="grid grid-cols-3 py-4">
          <h5 className="dark:text-white">Date Joined</h5>
          <span className="text-gray-600 dark:text-gray-400 col-span-2">{dayjs(profile?.dateJoined).format('MMM.DD, YYYY')}</span>
        </div> */}
      </div>
    </Card>
  );
};

export default Info;
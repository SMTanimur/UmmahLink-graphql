"use client"
import {
  CpuChipIcon,
  ExclamationTriangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import UserProfile from '../../user/[username]/components/UserProfile';
import { FC } from 'react';

import { Sidebar,useProfileQuery } from '~ui';

export const SettingsSidebar: FC = () => {
   const {data}= useProfileQuery()

  return (
    <div className="mb-4 space-y-1.5 px-3 sm:px-0">
      <div className="pb-3">
        <UserProfile
          profile={data?.me as any}
          showUserPreview={false}
        />
      </div>
      <Sidebar
        items={[
          {
            title: `Profile`,
            icon: <UserIcon className="h-4 w-4" />,
            url: '/settings'
          },
          {
            title: `Account`,
            icon: <CpuChipIcon className="h-4 w-4" />,
            url: '/settings/account'
          },
          {
            title: (
              <div className="text-red-500">
                <span>Danger Zone</span>
              </div>
            ),
            icon: <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />,
            url: '/settings/delete'
          }
        ]}
      />
    </div>
  );
};



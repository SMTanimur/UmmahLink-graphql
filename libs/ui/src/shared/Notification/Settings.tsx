
import { BellIcon, CogIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';
import { useState } from 'react';
import { Modal, Tooltip } from '../../components';
import { useMarkNotificationMutation } from '@social-zone/graphql';
import { useQueryClient } from '@tanstack/react-query';


export const Settings: FC = () => {

  const queryClient = useQueryClient();
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const {mutateAsync}=useMarkNotificationMutation()

  const handleMarkAllAsRead = async () => {
    await mutateAsync({input:{}},{
      onSuccess:()=>{
        queryClient.invalidateQueries(['notifications.infinite'])
        setShowNotificationSettings(false)
      }
    })
  }
  return (
    <>
      <button
        className="rounded-md p-1 hover:bg-gray-300/20"
        onClick={() => setShowNotificationSettings(true)}
      >
        <Tooltip placement="top" content={`Notification settings`}>
          <CogIcon className="lt-text-gray-500 h-5 w-5" />
        </Tooltip>
      </button>
      <Modal
        title="Notification settings"
        icon={<BellIcon className="text-brand h-5 w-5" />}
        show={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      >
        <div className="p-5">
        <div className="py-2 px-4 border-b-gray-200 flex justify-between items-center bg-indigo-700 md:rounded-t-md">
            <h6 className="text-white">Notifications</h6>
            <span
              className="text-sm  cursor-pointer p-2 text-white opacity-80 rounded-md hover:bg-indigo-500"
              onClick={()=>handleMarkAllAsRead()}
            >
              Mark all as read
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};


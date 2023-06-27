"use client"
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { useProfileQuery } from '@social-zone/client';

import clsx from 'clsx';
import type { FC } from 'react';


interface StatusProps {
  className?: string;
}

const Status: FC<StatusProps> = ({ className = '' }) => {
  const{data} = useProfileQuery()
  const currentProfile = data?.me
  // const setShowStatusModal = useGlobalModalStateStore(
  //   (state) => state.setShowStatusModal
  // );

  // const statusEmoji = getProfileAttribute(
  //   currentProfile?.attributes,
  //   'statusEmoji'
  // );
  // const statusMessage = getProfileAttribute(
  //   currentProfile?.attributes,
  //   'statusMessage'
  // );
  // const hasStatus = statusEmoji && statusMessage;

  return (
    <button
      type="button"
      className={clsx(
        'flex w-full items-center space-x-2 px-4 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
      // onClick={() => setShowStatusModal(true)}
    >
      {/* {hasStatus ? (
        <>
          <span>{statusEmoji}</span>
          <span className="truncate">{statusMessage}</span>
        </>
      ) : (
        <> */}
          <FaceSmileIcon className="h-4 w-4" />
          <span>
            <span>Set status</span>
          </span>
        {/* </>
      )} */}
    </button>
  );
};

export default Status;

"use client"
import { Menu } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { CommentPaginate } from '@social-zone/graphql';

import clsx from 'clsx';
import { useGlobalAlertStateStore } from '../../../store';
import type { FC } from 'react';
import { stopEventPropagation } from '../../../lib';
interface DeleteProps {
  Comment:CommentPaginate
}

const Delete: FC<DeleteProps> = ({ Comment }) => {
  const setShowCommentDeleteAlert = useGlobalAlertStateStore(
    (state) => state.setShowCommentDeleteAlert
  );

  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        clsx(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm text-red-500'
        )
      }
      onClick={(event) => {
        stopEventPropagation(event);
        setShowCommentDeleteAlert(true, Comment);
      }}
    >
      <div className="flex items-center space-x-2">
        <TrashIcon className="h-4 w-4" />
        <div>Delete</div>
      </div>
    </Menu.Item>
  );
};

export default Delete;

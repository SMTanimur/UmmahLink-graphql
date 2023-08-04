"use client"
import { Menu } from '@headlessui/react';
import { NewsFeedPaginate } from '@social-zone/graphql';
import clsx from 'clsx';
import { PencilIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { useGlobalModalStateStore } from '../../../store';
import { stopEventPropagation } from '../../../lib';

interface EditProps {
  post: NewsFeedPaginate;
}

const Edit: FC<EditProps> = ({ post }) => {  
  console.log(post,'post')
  const setShowEditPostModal = useGlobalModalStateStore(
    (state) => state.setShowPostEdit
  );
  const updatePost = useGlobalModalStateStore(
    (state) => state.updatePost
  );
  console.log(updatePost,'updatePost')
  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        clsx(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm text-green-500'
        )
      }
      onClick={(event) => {
        stopEventPropagation(event)
        setShowEditPostModal(true,post as NewsFeedPaginate)
      }}
    >
      <div className="flex items-center space-x-2">
        <PencilIcon className="h-4 w-4" />
        <div>Update</div>
      </div>
  
    </Menu.Item>
  );
};

export default Edit

"use client"
import { Menu } from '@headlessui/react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';


import { NewsFeedPaginate } from '@social-zone/graphql';
import clsx from 'clsx';
import { stopEventPropagation } from '../../../lib';
import type { FC } from 'react';
import toast from 'react-hot-toast';

interface CopyPostTextProps {
  post:NewsFeedPaginate
}

const CopyPostText: FC<CopyPostTextProps> = ({ post }) => {


  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        clsx(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm'
        )
      }
      onClick={async (event) => {
        stopEventPropagation(event);
        await navigator.clipboard.writeText(
         post.content || ''
        );
        toast.success(`Copied to clipboard!`);
      
      }}
    >
      <div className="flex items-center space-x-2">
        <ClipboardDocumentIcon className="h-4 w-4" />
        <div>
            <span>Copy post text</span>
        </div>
      </div>
    </Menu.Item>
  );
};

export default CopyPostText;

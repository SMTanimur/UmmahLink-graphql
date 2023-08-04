'use client';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';

import CopyPostText from './CopyPostText';
import Delete from './Delete';
import { stopEventPropagation } from '../../../lib';
import { MenuTransition } from '../../../components';
import { NewsFeedPaginate } from '@social-zone/graphql';
import { useProfileQuery } from '../../../hooks';
import Edit from './Edit';

interface PostMenuProps {
  Post: NewsFeedPaginate;
}

export const PostMenu: FC<PostMenuProps> = ({ Post }) => {
  const { data: me } = useProfileQuery();
  const iconClassName = 'w-[15px] sm:w-[18px]';

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>
        <button
          className="rounded-full p-1.5 hover:bg-gray-300/20"
          onClick={stopEventPropagation}
          aria-label="More"
          data-testid={`Post-${Post.id}-menu`}
        >
          <EllipsisVerticalIcon
            className={clsx('lt-text-gray-500', iconClassName)}
          />
        </button>
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          static
          className="absolute right-0 z-[5] mt-1 w-max rounded-xl border bg-white shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          data-testid={`Post-${Post.id}-menu-items`}
        >
          {me?.me._id === Post?.author?.id && <Delete post={Post} />}
          {me?.me._id === Post?.author?.id && <Edit post={Post} />}
          <CopyPostText post={Post} />
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
};

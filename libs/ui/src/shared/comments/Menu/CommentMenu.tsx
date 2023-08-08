'use client';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';

import Delete from './Delete';
import { stopEventPropagation } from '../../../lib';
import { MenuTransition } from '../../../components';
import { CommentPaginate } from '@social-zone/graphql';
import { useProfileQuery } from '../../../hooks';
import Edit from './Edit';

interface CommentMenuProps {
  Comment: CommentPaginate
  onClickEdit: () => void;
}

export const CommentMenu: FC<CommentMenuProps> = ({ Comment,onClickEdit }) => {
  const { data: me } = useProfileQuery();
  const iconClassName = 'w-[15px] sm:w-[18px]';

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>
        <button
          className="rounded-full p-1.5 hover:bg-gray-300/20"
          onClick={stopEventPropagation}
          aria-label="More"
          data-testid={`Post-${Comment?.id}-menu`}
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
          data-testid={`Post-${Comment?.id}-menu-items`}
        >
          {me?.me._id === Comment?.author?.id && <Delete Comment={Comment} />}
          {me?.me._id === Comment?.author?.id && <Edit onClickEdit={onClickEdit}/>}
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
};

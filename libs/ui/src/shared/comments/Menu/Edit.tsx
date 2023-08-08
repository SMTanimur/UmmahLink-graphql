"use client"
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { PencilIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { stopEventPropagation } from '../../../lib';

interface EditProps {
  onClickEdit: () => void;
}

const Edit: FC<EditProps> = ({ onClickEdit }) => {  
 
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
        onClickEdit()
      }}
    >
      <div className="flex items-center space-x-2">
        <PencilIcon className="h-4 w-4" />
        <span>Edit</span>
      </div>
  
    </Menu.Item>
  );
};

export default Edit

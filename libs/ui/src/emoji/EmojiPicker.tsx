'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import clsx from 'clsx';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

 export interface Emoji {
  id: string;
  native: string;
  name: string;
  shortcodes: string;
  keywords: string[];
}
interface EmojiPickerProps {
  className?: string;
	onEmojiPick: (emote: Emoji) => void
}


export function EmojiPicker({
  className,
	onEmojiPick
}: EmojiPickerProps) {
	
  return (
    <div className={clsx(className)}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="rounded-full group hover:bg-brand-400 p-1">
              <FaceSmileIcon className="w-7 h-7 text-brand-500 group-hover:text-brand-100" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-in duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel className=" absolute z-10  mt-3 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg  ">
                  <div className="relative  lg:grid-cols-2">
                    <Picker
										
                      data={data }
                      onEmojiSelect={(emoji: Emoji) =>
                        onEmojiPick(emoji)
                      }
                    />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

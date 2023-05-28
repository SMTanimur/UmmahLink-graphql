/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Dialog, Transition } from '@headlessui/react';
import { CloseIcon } from '@social-zone/ui';
import { Fragment, useRef } from 'react';
export const  Modal = ({ open, onClose, children }: any)=> {
  const cancelButtonRef = useRef(null);
  return (
    <Transition show={open} as={Fragment}
    
    >

    
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto bg-white"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={onClose}
      >
        <div className="min-h-full md:p-5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-full h-full" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block min-w-content max-w-full ltr:text-left rtl:text-right align-middle transition-all relative bg-white">
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="inline-block lg:hidden outline-none focus:outline-none absolute right-4 left-2 top-4 z-[60]  "
              >
                <span className="sr-only ">close</span>
                <CloseIcon className="w-4 h-4 absolute right-0" />
              </button>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
      
    </Transition>
  );
}

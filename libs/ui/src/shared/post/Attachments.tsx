"use client"
import {  PhotosImageInfo } from '@social-zone/graphql';
import clsx from 'clsx';
import type { FC } from 'react';
import {  useState } from 'react';
import { stopEventPropagation } from '../../lib';
import { Image, LightBox } from '../../components';


const getClass = (attachments: number, isNew = false) => {
  if (attachments === 1) {
    return {
      aspect: isNew ? 'aspect-w-16 aspect-h-10' : '',
      row: 'grid-cols-1 grid-rows-1'
    };
  } else if (attachments === 2) {
    return {
      aspect: 'aspect-w-16 aspect-h-12',
      row: 'grid-cols-2 grid-rows-1'
    };
  } else if (attachments > 2) {
    return {
      aspect: 'aspect-w-16 aspect-h-12',
      row: 'grid-cols-2 grid-rows-2'
    };
  }
};

interface AttachmentsProps {
  attachments: any;
  isNew?: boolean;
  hideDelete?: boolean;
  txn?: any;
}

const Attachments: FC<AttachmentsProps> = ({
  attachments = [],
  isNew = false,
}) => {
 
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  
  const attachmentsLength = attachments?.length;

  return attachmentsLength !== 0 ? (
    <>
      <div
        className={clsx(getClass(attachmentsLength)?.row, 'mt-3 grid gap-2')}
      >
        {attachments?.map(
          (attachment: PhotosImageInfo, index: number) => {

            return (
              <div
                className={clsx(
                   `${getClass(attachmentsLength, isNew)?.aspect} ${
                        attachmentsLength === 3 && index === 0
                          ? 'row-span-2'
                          : ''
                      }`,
                   
                  'relative'
                )}
                key={index + attachment.photosUrl!}
                onClick={stopEventPropagation}
                aria-hidden="true"
              >
                
                  <Image
                    className="cursor-pointer rounded-lg border bg-gray-100 object-cover dark:border-gray-700 dark:bg-gray-800"
                    loading="lazy"
                    height={1000}
                    width={1000}
                    onError={({ currentTarget }) => {
                      currentTarget.src = attachment.photosUrl!
                    }}
                    onClick={() => {
                      setExpandedImage(attachment.photosUrl!);
                
                    }}
                    src={attachment.photosUrl!}
                    alt={attachment.photosUrl!}
                    data-testid={`attachment-image-${attachment.photosUrl!}`}
                  />
              
              </div>
            );
          }
        )}
      </div>
      <LightBox
        show={Boolean(expandedImage)}
        url={expandedImage}
        onClose={() => setExpandedImage(null)}
      />
    </>
  ) : null;
};

export default Attachments;

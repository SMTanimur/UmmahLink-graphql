"use client"

import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button, IFileHandler, IImage, SmartLoader, useWindowDimensions } from "~ui";



interface IProps {
  coverPhotoOverlayRef: React.RefObject<HTMLDivElement>;
  coverPhoto: IFileHandler<IImage>;
  isUploadingCoverPhoto: boolean;
  isOwnProfile: boolean;
  handleSaveCoverPhoto: () => void;
}

const CoverPhotoOverlay: React.FC<IProps> = (props) => {
  const {width}= useWindowDimensions()
  const screen = width >= 800
  return (
    <div
      className={`w-full h-full md:bg-black md:bg-opacity-50 absolute flex items-center justify-center md:invisible transition-all ${props.coverPhoto.imageFile.file ? 'z-10' : 'z-0'}`}
      ref={props.coverPhotoOverlayRef}
    >
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={props.coverPhoto.onFileChange}
        readOnly={props.isUploadingCoverPhoto}
        id="cover"
      />
      {props.isOwnProfile && (
        <>
          {props.isUploadingCoverPhoto ? <SmartLoader mode="light" /> : (
            <>
              {props.coverPhoto.imageFile.file ? (
                <div className="flex">
                  <Button size="lg" variant="danger" className="" onClick={props.coverPhoto.clearFiles}
                  icon={ <XMarkIcon className="w-5 h-5 text-white" />}
                  
                  >
                   
                  </Button>
                  &nbsp;
                  <Button
                   size="lg"
                    className=" cursor-pointer"
                    variant="secondary"
                  >
                    Change
                  </Button>
                  &nbsp;
                  <Button size="lg" onClick={props.handleSaveCoverPhoto}>Save</Button>
                </div>
              ) : (
                <label
                  className="p-3 md:p-4 bg-indigo-700 absolute right-4 top-4  md:relative text-white font-medium rounded-full cursor-pointer hover:bg-indigo-800"
                  htmlFor="cover"
                >
                  {screen ? 'Change Cover Photo' : (
                    <CameraIcon className="w-5 h-5 text-white" />
                  )}
                </label>

              )}
            </>
          )}
        </>
      )}

    </div>
  );
};

export default CoverPhotoOverlay;

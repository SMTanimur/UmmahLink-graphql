"use client"

import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import getCroppedImg from '../../lib/cropImage';
import { IImage } from '../../types';
import { Button, Loader } from '../../components';
import LoadingIcon from '../../components/Spinner/LoadingIcon';

interface IProps {
  file: IImage;
  onClose: (data:Boolean)=> void
  onCropSuccessCallback: (file: File) => void;
}

export const CropProfileModal: React.FC<IProps> = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const getCroppedImage = useCallback(async () => {
    try {
      setIsCropping(true);
      console.log(props.file)
      const { url, blob } = await getCroppedImg(props.file.url, croppedAreaPixels);
      setIsCropping(false);
      const file = new File([blob], props.file.id, { type: 'image/jpeg' });
      console.log(file,'fi')
      props.onCropSuccessCallback(file);
      clearState();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('ERROR CROPPING: ', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels]);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  const clearState = () => {
    setCroppedAreaPixels(null);
    setZoom(1);
    setAspect(1);
    setCrop({ x: 0, y: 0 });
    props.onClose(true)
    
  }

  console.log(props.file?.url,'props.file?.url')

  return (
    <div>
     
        <div className="w-full min-w-[320px] laptop:w-30rem rounded-md">
          <div className="p-4 flex items-start justify-between">
            <h2 className="text-xl laptop:text-2xl dark:text-white">Crop Photo</h2>
            <div className="flex items-center">
              <Button
              size='md'
                disabled={isCropping}
                onClick={clearState}
              >
                Cancel
              </Button>
              &nbsp;
              <Button
              size='md'
              variant='super'
                onClick={getCroppedImage}
                disabled={isCropping}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="w-[400px] h-20rem px-10 py-10 relative">
            {isCropping && (
              <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 absolute">
                <h3 className="text-white mb-2">Cropping</h3>
                <LoadingIcon />
              </div>
            )}
            <Cropper
              image={props.file?.url || ''}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
            />
          </div>
          <div className="controls p-4">
         
            <input
              className="w-full outline-none"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              readOnly={isCropping}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onZoomChange(Number(e.target.value))}
              type="range"
            />
          </div>
        </div>
    </div>
  );
};



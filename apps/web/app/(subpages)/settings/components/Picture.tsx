;
import { PencilIcon } from '@heroicons/react/24/outline';

import { IUser } from '@social-zone/graphql';
import { ChangeEvent, FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Area, Button, ChooseFile,  Errors, Image, Modal, Spinner, errorToast, getCroppedImg, readFile } from '~ui';
import ImageCropperController from './ImageCropperController';
import { useProfileQuery } from '~ui';



interface PictureProps {
  profile: IUser 
}

const Picture: FC<PictureProps> = ({ profile }) => {
  const {data}=useProfileQuery()
 
  const currentProfile = data?.me
  const [avatarDataUrl, setAvatarDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageSrc, setImageSrc] = useState('');
  const [showCropModal, setShowCropModal] = useState(false);


  
  const onError = (error: any) => {
    setIsLoading(false);
    errorToast(error);
  };

 
  const uploadAndSave = async () => {
    if (!currentProfile) {
      return toast.error(Errors.Sign);
    }
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (!croppedImage) {
      return toast.error(Errors.SomethingWentWrong);
    }

    try {
      setIsLoading(true);
      // const ipfsUrl = await uploadCroppedImage(croppedImage);
      const dataUrl = croppedImage.toDataURL('image/png');

   

      setAvatarDataUrl(dataUrl);
     
     
    } catch (error) {
      onError(error);
    } finally {
      setShowCropModal(false);
    }
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageSrc(await readFile(file));
      setShowCropModal(true);
    }
  };

  const profilePictureUrl =
    profile?.avatar
  const profilePictureIpfsUrl = profilePictureUrl
    ? profilePictureUrl
    : '';

  return (
    <>
      <Modal
        title={`Crop image`}
        show={showCropModal}
        size="sm"
        onClose={
          isLoading
            ? undefined
            : () => {
                setImageSrc('');
                setShowCropModal(false);
              }
        }
      >
        <div className="p-5 text-right">
          <ImageCropperController
            imageSrc={imageSrc}
            setCroppedAreaPixels={setCroppedAreaPixels}
            targetSize={{ width: 300, height: 300 }}
          />
          <Button
            type="submit"
            disabled={isLoading || !imageSrc}
            onClick={() => uploadAndSave()}
            icon={
              isLoading ? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            <span>Save</span>
          </Button>
        </div>
      </Modal>
      <div className="space-y-1.5">
        {/* {error && (
          <ErrorMessage
            className="mb-3"
            title={`Transaction failed!`}
            error={error}
          />
        )} */}
        <div className="space-y-3">
          <div>
            <Image
              className="max-w-xs rounded-lg"
              src={avatarDataUrl || profilePictureIpfsUrl}
              alt={`Profile picture crop preview`}
            />
          </div>
          <div className="flex items-center space-x-3">
            <ChooseFile onChange={onFileChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Picture;

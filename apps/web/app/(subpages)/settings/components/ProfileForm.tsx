"use client"

/* eslint-disable @next/next/no-img-element */

;
import { object, string } from 'zod';

import ImageCropperController from './ImageCropperController';
import { Area, Button, Card, ChooseFile, Errors, Form, Image, Input, Modal, Regex, Spinner, TextArea, Toggle, errorToast, getCroppedImg, readFile, useZodForm } from '~ui';
import { IUser } from '@social-zone/graphql';
import { ChangeEvent, FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useProfileQuery } from '@social-zone/client';

const editProfileSchema = object({
  name: string()
    .max(100, {
      message: `Name should not exceed 100 characters`
    })
    .regex(Regex.profileNameValidator, {
      message: `Profile name must not contain restricted symbols`
    }),
 
  bio: string().max(260, { message: `Bio should not exceed 260 characters` })
});

interface ProfileSettingsFormProps {
  profile: IUser
}

const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({ profile }) => {

  const {data}=useProfileQuery()
  const currentProfile = data?.me
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [showCropModal, setShowCropModal] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');


 
  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      name: profile?.name ?? '',
     
      // bio: profile?.bio ?? ''
    }
  });

  const onError = (error: any) => {
    setIsLoading(false);
    errorToast(error);
  };

  const editProfile = async (
    name: string,
    bio?: string | null
  ) => {
    if (!currentProfile) {
      return toast.error(Errors.Sign);
    }

    try {
      setIsLoading(true);
    

    } catch (error) {
      onError(error);
    }
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
      setUploading(true);
      const dataUrl = croppedImage.toDataURL('image/png');
      setUploadedImageUrl(dataUrl);
    } catch (error) {
      onError(error);
    } finally {
      setShowCropModal(false);
      setUploading(false);
    }
  };

  const onFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (file) {
      setImageSrc(await readFile(file));
      setShowCropModal(true);
    }
  };


  return (
    <>
      <Card className="p-5">
        <Form
          form={form}
          className="space-y-4"
          onSubmit={({ name,  bio }) => {
            editProfile(name);
          }}
        >
          {/* {error && (
            <ErrorMessage
              className="mb-3"
              title={t`Transaction failed!`}
              error={error}
            />
          )} */}
        
          <Input
            label='Name'
            type="text"
            placeholder="Gavin"
            {...form.register('name')}
          />
          
          <TextArea
            label={`Bio`}
            placeholder={`Tell us something about you!`}
            {...form.register('bio')}
          />
          <div className="space-y-1.5">
            <div className="label">Cover</div>
            <div className="space-y-3">
              <div>
                <Image
                  className="h-60 w-full rounded-lg object-cover"
                  src={uploadedImageUrl }
                  alt={`Cover picture crop preview`}
                />
              </div>
              <div className="flex items-center space-x-3">
                <ChooseFile onChange={onFileChange} />
                {uploading && <Spinner size="sm" />}
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <div className="label flex items-center space-x-2">
              <img className="h-5 w-5" src="/pride.svg" alt="Pride Logo" />
              <span>
                <span>Celebrate pride every day</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="lt-text-gray-500">
                <span>
                  Turn this on to show your pride and turn the UmmahLink logo
                  rainbow every day.
                </span>
              </div>
            </div>
          </div>
          <Button
            className="ml-auto"
            type="submit"
            disabled={isLoading}
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
        </Form>
      </Card>
      <Modal
        title={`Crop image`}
        show={showCropModal}
        size="md"
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
            targetSize={{ width: 1500, height: 500 }}
          />
          <Button
            type="submit"
            disabled={uploading || !imageSrc}
            onClick={uploadAndSave}
            icon={
              uploading ? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            <span>Upload</span>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProfileSettingsForm;

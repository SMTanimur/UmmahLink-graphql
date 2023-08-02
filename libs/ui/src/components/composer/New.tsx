
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useGlobalModalStateStore } from '../../store';
import { Card } from '../Card';
import { Image } from '../image';
import { useProfileQuery } from '../../hooks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { UserAvatarUrl } from '../../data';

export const NewPost: FC = () => {
  const { push } = useRouter();

  const { data } = useProfileQuery();
  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
  );

  const openModal = () => {
    setShowNewPostModal(true);
  };

  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center space-x-3">
        <Image
          src={
            data?.me?.avatar.avatarUrl
              ? data?.me?.avatar.avatarUrl
              : UserAvatarUrl
          }
          className="h-9 w-9 cursor-pointer rounded-full border bg-gray-200 dark:border-gray-700"
          onClick={() => push(`/user/${data?.me?.username}`)}
          alt={data?.me?.username}
        />
        <button
          className="flex w-full items-center space-x-2 rounded-xl border bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          type="button"
          onClick={() => openModal()}
        >
          <PencilSquareIcon className="h-5 w-5" />
          <span>
            <span>What's happening?</span>
          </span>
        </button>
      </div>
    </Card>
  );
};

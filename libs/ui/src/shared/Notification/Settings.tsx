
import { BellIcon, CogIcon, SwatchIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';
import { useState } from 'react';
import { usePreferencesStore } from '../../store';
import { Modal, Tooltip } from '../../components';
import { ToggleWithHelper } from '../ToggleWithHelper';


export const Settings: FC = () => {
  const highSignalNotificationFilter = usePreferencesStore(
    (state) => state.highSignalNotificationFilter
  );
  const setHighSignalNotificationFilter = usePreferencesStore(
    (state) => state.setHighSignalNotificationFilter
  );
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);

  return (
    <>
      <button
        className="rounded-md p-1 hover:bg-gray-300/20"
        onClick={() => setShowNotificationSettings(true)}
      >
        <Tooltip placement="top" content={`Notification settings`}>
          <CogIcon className="lt-text-gray-500 h-5 w-5" />
        </Tooltip>
      </button>
      <Modal
        title="Notification settings"
        icon={<BellIcon className="text-brand h-5 w-5" />}
        show={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      >
        <div className="p-5">
          <ToggleWithHelper
            on={highSignalNotificationFilter}
            setOn={() => {
              setHighSignalNotificationFilter(!highSignalNotificationFilter);
            }}
            heading={`Signal filter`}
            description={`Turn on high-signal notification filter`}
            icon={<SwatchIcon className="h-4 w-4" />}
          />
        </div>
      </Modal>
    </>
  );
};


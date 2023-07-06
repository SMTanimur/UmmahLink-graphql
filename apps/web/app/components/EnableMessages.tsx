"use client"

import { EnvelopeIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { useUpdateEffect } from 'usehooks-ts';
import { Button, Card, cn, useAuth } from '~ui';

const EnableMessages: FC = () => {
  const {isAuthenticated}=useAuth()
  const { push } = useRouter();
  const [canMessage, setCanMessage] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onConversationSelected = () => {
    push('/messages');
  };

  useUpdateEffect(() => {
    const fetchCanMessage = async () => {
      setLoaded(true);
    };
    fetchCanMessage();
  }, [isAuthenticated]);

  if (!isAuthenticated || !loaded || canMessage) {
    return null;
  }

  return (
    <Card
      as="aside"
      className="mb-4 space-y-2.5 border-green-400 !bg-green-300/20 p-5 text-green-600"
    >
      <div className="flex items-center space-x-2 font-bold">
        <EnvelopeOpenIcon className="h-5 w-5" />
        <p>
          <span>Direct messages are here!</span>
        </p>
      </div>
      <p className="mr-10 text-sm leading-[22px]">
        <span>
          Activate XMTP to start using Lenster to send end-to-end encrypted DMs
          to frens.
        </span>
      </p>
      <Button
        className={cn({ 'text-sm': true }, 'mr-auto')}
        icon={<EnvelopeIcon className="h-4 w-4" />}
        onClick={onConversationSelected}
      >
        <span>Enable DMs</span>
      </Button>
    </Card>
  );
};

export default EnableMessages;

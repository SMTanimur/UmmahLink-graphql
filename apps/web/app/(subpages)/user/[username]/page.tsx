import React from 'react';

type Params = {
  params: {
    username: string;
  };
};
function ProfilePage({ params: { username } }: Params) {
  return <div className="text-5xl container">{username}</div>;
}

export default ProfilePage;

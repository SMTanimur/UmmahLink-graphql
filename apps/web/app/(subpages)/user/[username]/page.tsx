import React from 'react';
import UserComponent from './user-component';

type Params = {
  params: {
    username: string;
    type: string;
  };
};
function ProfilePage({ params: { username, type } }: Params) {
  return <UserComponent type={type} username={username} />;
}

export default ProfilePage;

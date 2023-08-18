"use client"
import type { FC } from 'react';
import { DeleteComment, DeletePost } from '~ui';



 const GlobalAlerts: FC = () => {
 
  return (
    <div>
      <DeletePost />
      <DeleteComment/>
    </div>
  );
};

export default GlobalAlerts;




import Link from 'next/link';
import type { FC } from 'react';
import {   SmartButton} from '~ui';

export const LoginButton: FC = () => {

  return (
    <SmartButton 
     
    
     size={'auto'}
     variant={'brand'}
     
      
      data-testid="login-button"
    >
      <Link href='/login' >Join</Link>
    </SmartButton>
  );
};

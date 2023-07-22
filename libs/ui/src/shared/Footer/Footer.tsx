
import type { FC } from 'react';

import Link from 'next/link';
const APP_NAME = 'UmmahLink'

export const Footer: FC = () => {
 

  return (
    <footer
      className=''
      data-testid="footer"
    >
      <div className={'mt-4 flex flex-wrap gap-x-[12px] px-3 lg:px-0'}>
        <span className="lt-text-gray-500 font-bold">
          &copy; {new Date().getFullYear()} {APP_NAME}
        </span>
        <Link href="/terms">
          <span>Terms</span>
        </Link>
        <Link href="/privacy">
          <span>Privacy</span>
        </Link>
        
        <Link href="/thanks">
          <span>Thanks</span>
        </Link>
       
    
      </div>
    </footer>
  );
};



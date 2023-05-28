"use client"

import Link from 'next/link';
import React, {  } from 'react';

import NavBarMobile from './NavBarMobile';
import { PATH } from '@social-zone/ui';
import { useModalAction } from '../../context/modal/modal.context';


const Navbar = () => {
  // const [laptop, setLaptop] = useState(true);
  // const { theme } = useAppStore();
  const {openModal}=useModalAction()
  // const laptop = useMediaQuery('laptop')
  // // browser code
  return (
    <React.Fragment>
      <div className="bg-white dark:bg-indigo-1000 h-[60px] border-b shadow-md laptop:shadow-sm dark:border-gray-900 text-gray-600 dark:text-white flex items-center justify-center fixed top-0 z-50 w-full py-2">
        <div className="relative layout-container">
          <nav className="hidden laptop:items-center laptop:justify-between laptop:flex">
            <div className="flex items-center space-x-4 ">
              <Link href={PATH.HOME} className="flex items-center gap-2 ">
                <img src="/images/logo.svg" alt="" className="w-7" />
                <h4 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                  SOCIAL ZONE
                </h4>
              </Link>
              {/* <SearchInput /> */}
            </div>

            <div className="hidden space-x-2 laptop:flex laptop:items-center">
              {/* <ThemeToggler /> */}
            </div>
          </nav>

          {/* <Suspense fallback={<nav className="fixed top-0 left-0 w-full bg-white shadow-md h-60px laptop:hidden"></nav>}>
           <NavBarMobile
            theme={theme}
            openModal={toggleModal}
            />
             </Suspense> */}

          <button
            className="flex items-center text-sm font-semibold transition-colors duration-200 text-accent hover:text-accent-hover focus:text-accent-hover focus:outline-none"
            onClick={()=>openModal('LOGOUT')}
          >
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;

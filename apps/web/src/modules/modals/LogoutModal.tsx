"use client"
import { useState } from "react";
import { useModalAction } from "../../context/modal/modal.context";





const LogoutModal: React.FC = () => {
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const {closeModal } = useModalAction();
  
  return (
    <div className="flex flex-col justify-center min-h-[500px] rounded-lg p-5 bg-white sm:p-8 md:min-h-0 md:rounded-xl">
        <div className='p-8 laptop:px-8'>
          <h2 className='dark:text-white'>Confirm Logout</h2>
          <p className='my-4 text-gray-600 dark:text-gray-400'>
            Are you sure you want to logout?
          </p>
          <br />
          <div className='flex items-center space-x-5'>
            <button
              className='px-10 py-2 bg-gray-600 hover:opacity-80 text-white rounded-full'
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className='px-10 py-2 bg-red-600 hover:opacity-80 text-white rounded-full'
              disabled={logoutLoading}
              // onClick={}
            >
              {logoutLoading ? 'Logging Out' : 'Logout'}
            </button>
          </div>
        </div>
       </div>
   
  );
};

export default LogoutModal;

import {
  ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined,
  LogoutOutlined, MenuOutlined, SearchOutlined,
  StarOutlined, TeamOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import { IUser, PATH } from "@social-zone/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";





interface IProps {
  theme: string;
  openModal: () => void;
}
const NavBarMobile: React.FC<IProps> = ({ theme,  openModal }) => {
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  // const {data:currentUser}=useCheckSession()
 
  const router = useRouter()
  const onClickMenuItem = () => {
    setOpenMenu(false);
  }

  const clickSearchItemCallback = (user: IUser) => {
    setOpenSearch(false);
    router.push(`/user/${user.username}`);
  }

  return isOpenSearch ? (
    <div className="fixed top-0 left-0 flex items-center w-full px-2 py-2 pr-2 shadow-xl dark:bg-indigo-1100 z-9999">
      <div
        className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-indigo-500"
        onClick={() => setOpenSearch(false)}
      >
        <ArrowLeftOutlined className="dark:text-white" style={{ fontSize: '18px' }} rev={undefined} />
      </div>
      {/* <SearchInput
        clickItemCallback={clickSearchItemCallback}
        inputClassName="w-full"
      /> */}
    </div>
  ) : (
    <nav className="fixed top-0 left-0 flex justify-between w-full py-2 text-gray-700 bg-white border-b border-transparent shadow-md contain z-9999 align-center w-100 dark:bg-indigo-1000 h-60px laptop:shadow-sm dark:border-gray-800">
      <div className="flex items-center space-x-8 shrink-0">
        {/* ---- LOGO -------- */}
        <link
          href={PATH.HOME}
        >
          <img
            src={theme === 'dark' ? '/assets/logo-light.svg' : '/assets/logo-dark.svg'}
            alt=""
            className="w-32"
          />
        </link>
      </div>
      {/* ---- NAVICONS FOR MOBILE ---- */}
      <div className="flex items-center space-x-4 laptop:hidden">
       
        <div
          className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-indigo-1100"
          onClick={() => setOpenSearch(true)}
        >
          <SearchOutlined style={{ fontSize: '20px' }} rev={undefined} />
        </div>
        <div
          className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-indigo-1100"
          onClick={() => setOpenMenu(true)}
        >
          <MenuOutlined style={{ fontSize: '20px' }} rev={undefined} />
        </div>
      </div>
      {/* ---- NAV DRAWER FOR MOBILE --- */}
      <div className={`flex  flex-col w-full h-screen fixed top-0 right-0 transition-transform  transform ${isOpenMenu ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-indigo-1000 laptop:hidden`}>
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="dark:text-white">Menu</h1>
            {/* <ThemeToggler /> */}
          </div>
          <div
            className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-indigo-1100"
            onClick={() => setOpenMenu(false)}
          >
            <CloseOutlined style={{ fontSize: '20px' }} rev={undefined} />
          </div>
        </div>
       
        {/* --- COPYRIGHT -- */}
        <div className="absolute left-0 right-0 mx-auto bottom-24 ">
          <span className="block text-xs text-center text-gray-400">
            &copy;Copyright {new Date().getFullYear()} Social Zone
          </span>
          <span className="block text-sm text-center text-gray-400">
            Crafted with ❤️ by <a href="">SM Tanimur</a>
          </span>
        </div>
      </div>
    </nav>
  )
};

export default NavBarMobile;
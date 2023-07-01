"use client"
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { cn } from '../lib';
import { usePathname } from 'next/navigation';

interface MenuProps {
  children: ReactNode;
  current: boolean;
  url: string;
}

const Menu: FC<MenuProps> = ({ children, current, url }) => (
  <Link
    href={url}
    className={cn(
      { 'bg-brand-100 dark:bg-brand-300/20 text-brand font-bold': current },
      'hover:bg-brand-100/80 dark:hover:bg-brand-300/30',
      'flex items-center space-x-2 rounded-lg px-3 py-2'
    )}
  >
    {children}
  </Link>
);

interface SidebarProps {
  items: {
    title: ReactNode;
    icon: ReactNode;
    url: string;
    active?: boolean;
    enabled?: boolean;
  }[];
}

export const Sidebar: FC<SidebarProps> = ({ items }) => {
  const  pathname  = usePathname();
  const menuItems = items.map((item) => ({
    ...item,
    enabled: item.enabled ?? true
  }));

  return (
    <div className="mb-4 space-y-1.5 px-3 sm:px-0">
      {menuItems.map((item: any) =>
        item?.enabled ? (
          <Menu
            key={item.title}
            current={pathname === item.url || item.active}
            url={item.url}
          >
            {item.icon}
            <div>{item.title}</div>
          </Menu>
        ) : null
      )}
    </div>
  );
};


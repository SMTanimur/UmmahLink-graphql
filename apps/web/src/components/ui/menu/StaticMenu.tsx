"use client"
import Link from 'next/link';
import { ROUTES } from '~ui';



const headerLinks = [
  { href: ROUTES.SHOPS, icon: null, label: 'nav-menu-shops' },
  { href: ROUTES.OFFERS, icon: null, label: 'nav-menu-offer' },
  { href: ROUTES.HELP, label: 'nav-menu-faq' },
  { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
];

export const StaticMenu = () => {


  return (
    <>
      {headerLinks.map(({ href, label, icon }) => (
        <li key={`${href}${label}`}>
          <Link
            href={href}
            className="font-normal text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
          >
            {icon && <span className="ltr:mr-2 rtl:ml-2">{icon}</span>}
            {label}
          </Link>
        </li>
      ))}
    </>
  );
};


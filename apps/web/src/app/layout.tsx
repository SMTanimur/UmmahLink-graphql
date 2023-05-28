

import type { Metadata } from 'next';

import '../styles/global.css';

import {  defaultMetadata } from '@social-zone/ui';
import { ModalProvider } from '../context/modal/modal.context';
import Navbar from '../modules/common/NavBar';
import ManagedModal from '../context/modal/managed-modal';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning={true} 
      >
        <ModalProvider>
        <Navbar/>
        {children}
        <ManagedModal />
        </ModalProvider>
      </body>
    </html>
  );
}


import type { Metadata } from 'next';

import '../styles/global.css';

import {  defaultMetadata } from '~ui';


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
        
        {children}
     
      </body>
    </html>
  );
}
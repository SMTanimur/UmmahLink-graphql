
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/global.css';
import {  defaultMetadata } from '~ui';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";



const Providers = dynamic(() => import('./Provider'), {
  ssr: false,
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});


export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body  className={poppins.className} suppressHydrationWarning={true}>
      <MantineProvider>
        <Providers>
        
          <Toaster
            position="top-right"
            // toastOptions={getToastOptions(resolvedTheme)}
          />
        {/* <GlobalModals/>   */}
         < div className=" ">
      
        {children}
      </div>
        </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}

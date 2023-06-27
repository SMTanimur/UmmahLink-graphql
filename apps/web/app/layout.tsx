import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/global.css';

import { defaultMetadata } from '~ui';

import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import BottomNavigation from './components/Navbar/BottomNavigation';

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
    <html lang="en">
      <body suppressHydrationWarning={true} className={poppins.className}>
        <Providers>
          <Toaster
            position="top-right"
            // toastOptions={getToastOptions(resolvedTheme)}
          />
         < div className="flex min-h-screen flex-col pb-14 md:pb-0">
        <Navbar />
        <BottomNavigation />
        {children}
      </div>
        </Providers>
      </body>
    </html>
  );
}

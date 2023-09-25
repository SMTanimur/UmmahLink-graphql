"use client"
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { BottomNavigation } from '../components/Navbar/BottomNavigation';
// import { Navbar } from './components/Navbar/Navbar';



const Navbar = dynamic(() => import('../components/Navbar/Navbar'), {
  ssr: false,
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <div  >
    
        
          <Toaster
            position="top-right"
            // toastOptions={getToastOptions(resolvedTheme)}
          />
        {/* <GlobalModals/>   */}
         < div className="flex min-h-screen flex-col pb-14 md:pb-0 relative ">
        <Navbar />
        <BottomNavigation />
        {children}
      </div>
 
      </div>
   
  );
}

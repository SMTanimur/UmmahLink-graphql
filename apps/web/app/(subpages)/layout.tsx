
import { BottomNavigation } from '../components/Navbar/BottomNavigation';
import Navbar from '../components/Navbar/Navbar';
// import { Navbar } from './components/Navbar/Navbar';





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div  >
         < div className="flex min-h-screen flex-col pb-14 md:pb-0 relative ">
        <Navbar />
        <BottomNavigation />
        {children}
      </div>
 
      </div>
   
  );
}

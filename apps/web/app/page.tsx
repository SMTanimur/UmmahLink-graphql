import { Metadata } from "next";
import Link from "next/link";


const HomePage = () => {
  return (
     <>
     <div>
        <h1>Home Page</h1>
        {/* <Link href='/login'>
          login
        </Link> */}
     </div>
     </>
  )
};

export default HomePage;
export const metadata: Metadata = {
  title: 'Home'
}

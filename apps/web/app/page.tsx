import { Metadata } from "next";
import Link from "next/link";

export const metaData:Metadata={
  title:'Home'
}
const HomePage = () => {
  return (
     <>
     <div>
        <h1>Home Page</h1>
        <Link href='/login'>
          login
        </Link>
     </div>
     </>
  )
};

export default HomePage;


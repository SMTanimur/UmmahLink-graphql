import { Metadata } from "next";


export default async function Index() {
 
  return (
    <div className='h-screen flex justify-center items-center'>
      <div>
        <h1 className='text-indigo-700 text-5xl'>Page</h1>
      </div>
    </div>
  );
}

export const metaData:Metadata={
  title:'Home'
}

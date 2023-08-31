import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className=' h-screen w-full text-center flex flex-col items-center justify-center bg-red-50'>
      <h1 className='md:text-[3rem]'>Either this page is under construction <br /> or you don't have permission to see it</h1>
      <Link href="/" className='text-blue-400'>Return Home</Link>
    </div>
  )
}
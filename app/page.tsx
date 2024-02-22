import { prisma } from '@/lib/prisma'
import { UploadForm } from './form'
import Image from 'next/image'



export default async function Home() {


  const files = await prisma.conversion.findMany({

})
  return (
    <main className="flex flex-col justify-center px-4 bg-image bg-black">

      <Image src='/z.webp' width={500} height={500} alt='bg-center-image' className=' fixed left-1/2 -translate-x-1/2 opacity-60'/>


      <div className='flex flex-col lg:flex-row px-16  items-center gap-12 z-10 m-auto h-screen'>

        <div className='z-50 w-full'>
          <UploadForm/>
        </div>

        <div className='w-[340px] z-50 text-white'>
          <h1 className=' font-extrabold text-3xl border-b-2 py-2'>Pishared</h1>
          <p className='font-bold text-lg'>Comedian Guy Montgomery wonders whether it’s worth ‘paying your dues’ at any company when it all</p>
        </div>
      </div>


    </main>
  )
}

import Image from 'next/image'
import { UploadForm } from './form'

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center px-4 overflow-x-hidden">
      <video style={{ backgroundColor: '#373434' }} preload='auto' loop autoPlay muted className='absolute left-0 top-0 bottom-0 h-screen object-cover'>
        <source src='/v.mp4' type='video/mp4'/>
      </video>
      <div className='flex flex-col lg:flex-row px-16  items-center gap-12 z-10'>


        <div className='z-50'>
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

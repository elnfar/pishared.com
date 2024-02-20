import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <header className='fixed w-full z-50'>
        <div className='flex items-center gap-4 justify-between py-7 lg:px-14 px-2'>
            <Link href='/' className='text-[1.5rem] text-[#f9c3c3] font-bold'>Cloust</Link>
            <nav>
                <ul className='flex items-center lg:gap-8 gap-4 bg-white p-4 px-4 rounded-md'>
                    <li><Link href='/pricing'>pricing</Link></li>
                    <li><Link href='/features'>features</Link></li>
                    <li><Link href='/guide'>guide</Link></li>
                    <li><Link href='/login'>login</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

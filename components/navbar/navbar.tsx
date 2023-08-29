import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <header className='fixed w-full z-50'>
        <div className='flex items-center justify-between py-7 px-14'>
            <h1 className='text-[1.5rem] text-white font-bold'>Pi</h1>
            <nav>
                <ul className='flex items-center gap-8 bg-white p-4 px-4 rounded-md'>
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

'use client'

import React from 'react'
import { Button } from './button'
import Link from 'next/link'



type CProps = {
    title:string,
    desc:string,
    price:number
}

export default function CardComponent({title,desc,price}:CProps) {

  return (
    <div className='w-[340px]  min-h-[340px] bg-red-300 text-zinc-700 px-2 py-6 rounded-lg'>
        <h1 className='text-[2rem]'>{title}</h1>
        <p className='py-5 font-light h-[200px]'>{desc}</p>

        <div className='text-center'>
            <p className=' text-[1.5rem] text-center'>$ {price}</p>
            <Button asChild className='px-16 py-6' disabled>
                <Link aria-disabled href='/login'>Comin soon</Link>
            </Button>
        </div>
    </div>
  )
}

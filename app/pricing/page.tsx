import CardComponent from '@/components/ui/card'
import React from 'react'

export default function page() {
  return (
    <div>
      
        <div className='flex items-center justify-center h-screen'>

          <div className='flex gap-2'>
              <CardComponent title='Basic' desc='Free tier up to 1 mb file upload and up to 3 file selection' price={0}/>
              <CardComponent title='Premium' desc='Premium version up to 100 mb file upload and up to unlimited file selection' price={7}/>
              <CardComponent title='Super' desc='Super version up to 1 gb file upload and up to unlimited file selection' price={14}/>
          </div>

        </div>

    </div>
  )
}

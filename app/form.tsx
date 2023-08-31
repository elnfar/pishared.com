'use client'

import { Button } from '@/components/ui/button';
import { ChangeEvent,useState } from 'react'
import {Loader2, PlusCircle} from 'lucide-react'
import { sendEmail } from '@/actions/send-email';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

const initialState = {
       receiver: '',
        subject: '',
        message: '',
        sender:''
}

const MAX_FILE_SIZE_MB = 1; 
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_FILES_COUNT = 3;

export function UploadForm() {



  const [file, setFile] = useState<File[]>([])
  const [fileIds, setFileIds] = useState<string[]>([]);  // <-- Change to store multiple IDs
  const [state,setState] = useState(initialState)
  const [loading, setLoading] = useState(false);


  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {

      const newFiles = Array.from(e.target.files);

      if (newFiles.length > MAX_FILES_COUNT) {
        alert(`You can upload a maximum of ${MAX_FILES_COUNT} files at a time.`);
        return;
      }

      if (newFiles.length + file.length > MAX_FILES_COUNT) {
        alert(`You can upload a maximum of ${MAX_FILES_COUNT} files in total. You've already selected ${file.length} files.`);
        return;
    }

      const oversizedFiles = newFiles.some(file => file.size > MAX_FILE_SIZE_BYTES);

      if (oversizedFiles) {
            alert(`Please ensure all files are under ${MAX_FILE_SIZE_MB}MB.`);
            return;
      }


      setLoading(true);  // Start loading
      setFile(prevFiles => [...prevFiles, ...newFiles]); // This line will add new files to the existing list

      await uploadFiles(newFiles);  
      setLoading(false);
    }
  };




  const uploadFiles = async (files: File[]) => {
    try {
      const data = new FormData();
      files.forEach(file => data.append('file', file));

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });

      if (!res.ok) throw new Error(await res.text());

      const returnedIds = await res.json();

      setFileIds(prevIds => [...prevIds, ...returnedIds.id]);
    } catch (e: any) {
      console.error(e);
    }
  }


const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
   setState({...state,[e.target.name]:e.target.value})
}

  return (
    <div className='bg-white max-w-[250px] justify-center rounded-3xl p-4'>
    <div className='flex flex-col gap-3  py-1 border-b-2'>


      <div className='flex items-center justify-center py-2'>
      {loading === false ? (
          <>
        <Button asChild variant="ghost" className=' cursor-pointer'>
         <label htmlFor="file"><PlusCircle size={42}/></label>
        </Button>

       
              <input
              type="file"
              multiple
              autoComplete='false'
              name="file"
              id='file'
              className='hidden'
              onChange={handleFileChange}
            />
              
            <p className='text-[1.8rem]'>Upload</p>
          </>
        ) : (
          <span>
            <Loader2 className='animate-spin' size={50}/>
            </span>
        )}
       
      </div>
     
    </div>

    <form className=' font-sans' action={async(formData) => {
          await sendEmail(formData);
          setState(initialState)
          setFile([])
          setFileIds([])
        }}>
                <input type="email" name='receiver' value={state.receiver} onChange={handleChange} className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='email to'/>
                <input type="email" name='sender' value={state.sender} onChange={handleChange} className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='your email'/>
                <input type="text" name='subject' value={state.subject} onChange={handleChange}  className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='subject'/>
                <input type="hidden"  name='message' defaultValue={
                  fileIds.length > 0 ? `http://localhost:3000/downloads/${fileIds.join(",")}`:''
                } onChange={handleChange}  className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='message'/>

     

    <div className='flex justify-center py-4 items-center'>
         <SubmitButton name='Transfer'/>
    </div>
        </form>
  

    <div className='max-w-[500px]'>
        {file.length > 0 && (
            <div className='py-4 px-4 border-b-2 border-black  max-w-[500px]'>
          <p className='text-xs max-w-[500px]'>
                  {file.map((item, index) => (
                    <span key={index}>{item.name}<br/></span>  // Display each file name on a new line
                  ))}
                </p>            
          </div>

        )}
      </div>

    </div>
  )
}


const SubmitButton = ({name}:{name:string}) => {

  const { pending } = useFormStatus()


  return <Button type='submit' disabled={pending}>{name}</Button>
}


// 'use client'

// import { Button } from '@/components/ui/button';
// import { ChangeEvent, FormEvent, useState } from 'react'
// import {PlusCircle} from 'lucide-react'
// import Mailgun from 'mailgun.js'
// import { sendEmail } from '@/actions/send-email';

// const initialState = {
//        receiver: '',
//         subject: '',
//         message: '',
//         sender:''
// }


// export function UploadForm() {



//   const [file, setFile] = useState<File[]>([])
//   const [fileIds, setFileIds] = useState<string[]>([]);  // <-- Change to store multiple IDs
//   const [state,setState] = useState(initialState)


//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!file) return

//     try {
//       const data = new FormData()
//       file.forEach(file => data.append('file', file))

//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: data
//       })
//       // handle the error
//       if (!res.ok) throw new Error(await res.text())

//       const returnedIds = await res.json();

//       setFileIds(returnedIds.id);  // <-- Update to set multiple IDs
//     } catch (e: any) {
//       // Handle errors here
//       console.error(e)
//     }
//   }

// const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
//    setState({...state,[e.target.name]:e.target.value})
// }

//   return (
//     <div className='bg-white max-w-[220px] justify-center rounded-3xl p-4'>
//     <form onSubmit={onSubmit} className='flex flex-col gap-3  py-1 border-b-2'>


//       <div className='flex'>
//         <Button asChild variant="ghost" className=' cursor-pointer'>
//          <label htmlFor="file"><PlusCircle size={42}/></label>
//         </Button>
//         <input
//           type="file"
//           multiple
//           autoComplete='false'
//           name="file"
//           id='file'
//           className='hidden'
//           onChange={(e) => {
//               if (e.target.files && e.target.files.length > 0) {
//                 setFile(Array.from(e.target.files))
//               }
//             }}
//         />
          
//         <input type="submit" value="Upload" className='text-[1.8rem]'/>

//       </div>
     
//     </form>

//     <form action={async(formData) => {
//           await sendEmail(formData);
//         }}>
//                 <input type="email" name='receiver' value={state.receiver} onChange={handleChange} className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='email to'/>
//                 <input type="email" name='sender' value={state.sender} onChange={handleChange} className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='your email'/>
//                 <input type="text" name='subject' value={state.subject} onChange={handleChange}  className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='subject'/>
//                 <input type="text" name='message' value={state.message} onChange={handleChange}  className='border-b-2 outline-none p-1 placeholder:text-xs' placeholder='message'/>

     
//           <button type='submit'>Send</button>
//         </form>
  

//     <div>
//         {file.length > 0 && (
//             <div className='py-4 px-4 border-b-2 border-black w-full'>
//                 <p className='text-xs'>{file.map((item) => item.name)}</p>
//             </div>

//         )}
//       </div>
     


//     <div className='flex justify-center py-4 items-center'>
//       <Button asChild >
//         <a href={`/api/download/${fileIds.join(",")}`}>DOWNLOAD</a>
//       </Button>
//     </div>
       
//     </div>
//   )
// }
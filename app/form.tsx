'use client'

import { Button } from '@/components/ui/button';
import { ChangeEvent,useState } from 'react'
import { Loader2, PlusCircle, Share} from 'lucide-react'

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
    } catch (e:any) {
      console.error(e);
    }
  }


  const copyToClipboard = async (text:any) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div className='bg-white w-full justify-center rounded-3xl p-4'>
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

        
         {fileIds.at(0) && (
            <div className=' mx-auto w-full flex justify-center py-4'>
              {/* <h1 className=' truncate'>{`http://localhost:3000/downloads/${fileIds.join(",")}`}</h1> */}
              <Share className=' cursor-pointer' onClick={() => copyToClipboard(fileIds.at(0) )}/>
            </div>
         )}                
  
    <div className=' w-full'>
        {file.length > 0 && (
            <div className='py-4 px-4 border-b-2 border-black '>
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

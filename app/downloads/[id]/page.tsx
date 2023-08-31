import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { PlusCircle } from "lucide-react";


export default async function page({params}:{params:{id:string}}) {

    const decodedIds = decodeURIComponent(params.id);
    const individualIds = decodedIds.split(',');

    const files = await prisma.conversion.findMany({
        where: {
            id: {
                in: individualIds
            }
        }
    })

    console.log(files);
    console.log(individualIds,'params');
        

    return (
      <div className='bg-white max-w-[250px] justify-center rounded-3xl p-4'>
      <div className='flex flex-col gap-3  py-1 border-b-2'>
  
  
        <div className='flex items-center py-2'>
          <Button asChild variant="ghost" className=' cursor-pointer'>
           <label htmlFor="file"><PlusCircle size={42}/></label>
          </Button>
          <p className='text-[1.8rem]'>Upload</p>
        </div>
       
      </div>
  
         
              <Button asChild >
                      <a href={`https://cloust.pro/api/downloads/${files.map(f => f.id).join(",")}`}>DOWNLOAD</a>
                </Button>
  
      </div>
    )
          }

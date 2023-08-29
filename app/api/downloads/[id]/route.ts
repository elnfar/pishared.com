import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import * as AWS from 'aws-sdk';

import archiver from 'archiver';
import { WritableStreamBuffer } from 'stream-buffers';

AWS.config.update({
    region:process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  

const bucket = process.env.S3_BUCKET_NAME!

export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    const ids = params.id.split(","); // Split the IDs
    console.log('ods',ids);
    
    const conversion = await prisma.conversion.findMany({
        where: {
            id:{
                in:ids
            }
        }
    })

    console.log(params.id);
    

    if(!conversion) {
        return new NextResponse(JSON.stringify({error:"No id found"}), {
            status:404
        })


    }    

    const s3 = new AWS.S3();

    const archive = archiver('zip');
    const bufferStream = new WritableStreamBuffer();
    archive.pipe(bufferStream);


    for (const f of conversion) {
        const fileStream = s3.getObject({
          Bucket: bucket,
          Key: f.s3Key.replace(`s3://${bucket}/`, '')
        }).createReadStream();
    
        archive.append(fileStream, { name: f.s3Key }); // You can customize the file name if needed
      }
    
      archive.finalize();


      await new Promise((resolve, reject) => {
        archive.on('end', resolve);
        archive.on('error', reject);
      });


    return new NextResponse(bufferStream.getContents() as any, {
        headers: {
            'Content-Type': 'application/zip',  // Serve as binary data
            'Content-Disposition': `attachment; filename=download.zip`  // Always download as "download" (no extension)
        }
    })
}
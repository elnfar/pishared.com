import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { prisma } from "@/lib/prisma";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";



AWS.config.update({
    region:process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  

const bucket = process.env.S3_BUCKET_NAME!


export async function POST(req:NextRequest) {

    const MAX_FILE_SIZE_MB = 5; // 5MB as an example
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    const MAX_FILES_COUNT = 3;

    const data = await req.formData()
    const file = data.getAll('file') as unknown as File[];

    if (!file || file.length === 0) {
        return new NextResponse(JSON.stringify({ error: "no files found here" }), {
            status: 400
        })
    }
  
    if (file.some(f => f.size > MAX_FILE_SIZE_BYTES)) {
        return new NextResponse(JSON.stringify({ error: `File size should be under ${MAX_FILE_SIZE_MB}MB` }), {
            status: 400
        });
    }

    if (file.length > MAX_FILES_COUNT) {
        return new NextResponse(JSON.stringify({ error: `You can upload a maximum of ${MAX_FILES_COUNT} files at a time.` }), {
            status: 400
        });
    }


    const s3 = new AWS.S3();

    const uploadedFiles = [];

    for (const f of file) {
        const bytes = await f.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = f.name.split('.').pop();

        const key = `${randomUUID()}${randomUUID()}.${fileExtension}`;
        const params = {
            Bucket: bucket,
            Key: key,
            Body: buffer
        };

        const uploadResponse = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${uploadResponse.Location}`);

        const conversion = await prisma.conversion.create({
            data: {
                s3Key: key,
                status: 'DONE',
            }
        });

        uploadedFiles.push(conversion.id);
    }

    
    return  NextResponse.json({id:uploadedFiles})
}
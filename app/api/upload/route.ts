import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import * as AWS from 'aws-sdk';
import { randomUUID } from "crypto";



AWS.config.update({
    region:process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  

const bucket = process.env.S3_BUCKET_NAME!


export async function POST(req:NextRequest) {

    const data = await req.formData()
    const file = data.getAll('file') as unknown as File[];

    if (!file || file.length === 0) {
        return new NextResponse(JSON.stringify({ error: "no files found here" }), {
            status: 400
        })
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
                status: Status.DONE,
            }
        });

        uploadedFiles.push(conversion.id);
    }

    
    return  NextResponse.json({id:uploadedFiles})
}
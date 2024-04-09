import axios from "axios";
import { Deta } from "deta";
import { NextRequest, NextResponse } from "next/server";


// Initialize
process.env.DETA_PROJECT_KEY! = process.env.NEXT_PUBLIC_DETA_PROJECT_KEY!;
const deta = Deta();

const project_id = process.env.NEXT_PUBLIC_DETA_PROJECT_KEY!.split('_')[0];


// This how to connect to or create a drive.
const image_drive = deta.Drive('image');
const video_drive = deta.Drive('video');
const audio_drive = deta.Drive('audio');


export async function POST(request: NextRequest) {
    try {
        const formData: any = await request.formData();
        console.log(formData);

        // generate a 32 alphanumeric string
        let fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `${formData.get('fileName')}`;
        // const fileName = `${key}.${formData.get('type') === 'image' ? 'png' : formData.get('type') === 'video' ? 'mp4' : 'mp3'}`;
        fileName = fileName.replace(/\s/g, ''); // remove white spaces

        // chunk the data into smaller parts of each 4MB
        // const chunkedData = [];
        const chunkSize = 4.9 * 1024 * 1024;
        const chuckCount = Math.ceil(formData.get('data').length / chunkSize);

        if (chuckCount > 1) {
            // save the data in chunks
            return new Response('File size is too large!', { status: 400 });
        }

        // Convert the file data to a Buffer
        const buffer = Buffer.from(await formData.get('data').arrayBuffer());

        const fileExtension = formData.get('fileName').split('.').pop()?.toLowerCase();

        // save the data
        if (formData.get('type') === 'image') {
            await image_drive.put(fileName, { data: buffer, contentType: `image/${fileExtension}` });
        } else if (formData.get('type') === 'video') {
            await video_drive.put(fileName, { data: buffer, contentType: 'video/mp4' });
        } else if (formData.get('type') === 'audio') {
            await audio_drive.put(fileName, { data: buffer, contentType: 'audio/mp3' });
        }

        // return NextResponse.json({ message: 'Data saved successfully', url: `/api/data/${key}.${formData.get('type') === 'image' ? 'png' : formData.get('type') === 'video' ? 'mp4' : 'mp3'}` });
        return NextResponse.json({ message: 'Data saved successfully', url: `/api/data/${fileName}` });

    } catch (error) {
        console.log(error);
    }
}
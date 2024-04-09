import axios from "axios";
import { Deta } from "deta";
import { NextRequest, NextResponse } from "next/server";


// Initialize
process.env.DETA_PROJECT_KEY! = process.env.NEXT_PUBLIC_DETA_PROJECT_KEY!;
const deta = Deta();


// This how to connect to or create a drive.
const image_drive = deta.Drive('image');
const video_drive = deta.Drive('video');
const audio_drive = deta.Drive('audio');


const project_id = process.env.NEXT_PUBLIC_DETA_PROJECT_KEY!.split('_')[0];


type Params = {
    file_name: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
    try {
        const fileName = context.params.file_name.replace(/\s/g, ''); // remove white spaces
        // const fileName = request.url.split('/').pop() as string; 
        // const { fileName } = request.query;

        const type = fileName.split('.').pop()?.toLowerCase(); // if the file name is image.png, this will return png
        console.log(fileName, type);

        // if (type === 'png' || type === 'jpg' || type === 'jpeg') {
        //     const image = await image_drive.get(fileName);
        //     console.log(image?.stream);

        //     if (type === 'jpg') {
        //         // return new Response(image, { headers: { 'Content-Type': 'image/jpg' } });
        //         return image?.stream;
        //     }

        //     return new Response(image, { headers: { 'Content-Type': `image/${type}` } });
        // } else if (type === 'mp4') {
        //     const video = await video_drive.get(fileName);
        //     console.log(video);
        //     return new Response(video, { headers: { 'Content-Type': 'video/mp4' } });
        // } else if (type === 'mp3') {
        //     const audio = await audio_drive.get(fileName);
        //     console.log(audio);
        //     return new Response(audio, { headers: { 'Content-Type': 'audio/mp3' } });
        // } else {
        //     return new Response('File extension not supported!', { status: 400 });
        // }

        const image_response = await image_drive.get(fileName);
        const video_response = await video_drive.get(fileName);
        const audio_response = await audio_drive.get(fileName);
        // if (response) {
        //     console.log(response);
        //     return new Response(response, { headers: { 'Content-Type': `image/${type}` } });
        // } else if (!response) {
        // } else if (video_response) {
        //     console.log(response);
        //     return new Response(video_response, { headers: { 'Content-Type': 'video/mp4' } });
        // } else if (!response) {
        // } else if (audio_response) {
        //     return new Response(audio_response, { headers: { 'Content-Type': 'audio/mp3' } });
        // }

        if (image_response) {
            return new Response(image_response, { headers: { 'Content-Type': `image/${type}` } });
        } else if (video_response) {
            return new Response(video_response, { headers: { 'Content-Type': 'video/mp4' } });
        } else if (audio_response) {
            return new Response(audio_response, { headers: { 'Content-Type': 'audio/mp3' } });
        }

        if (!image_response && !video_response && !audio_response) {
            return new Response('File not found', { status: 404 });
        }

        console.log(image_response, video_response, audio_response);

    } catch (error) {
        console.log(error);
        return new Response('File not found', { status: 404 });
    }
}
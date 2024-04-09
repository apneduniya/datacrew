"use client"

import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Image from "next/image";1
import cameraIcon from "@/assets/images/camera-icon.svg";
import microphoneIcon from "@/assets/images/microphone-icon.svg";
import playIcon from "@/assets/images/play-icon.svg";
import { useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function DataCreateDrawerContent() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const audioRef = useRef(null);
    const [hasData, setHasData] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const navigate = useRouter();


    const FileToURL = async (event: any) => {
        const body = new FormData();
        const newBody = new FormData();
        const rf = new FileReader();

        // rf.readAsDataURL(event.target.files[0]);
        newBody.append('fileName', event.target.files[0].name);

        // get the file type 
        const fileExtension = event.target.files[0].name.split('.').pop()?.toLowerCase();
        const fileType = fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'image' : fileExtension === 'mp4' ? 'video' : 'audio';

        // const fileExtension = event.target.files[0].name.split('.').pop()?.toLowerCase();
        // rf.onload = async function (event) {
        //     console.log(rf.result);

        //     // body.set('key', '1e324b4ffd7be805484317642e989bbb');
        //     // body.append('image', event.target.result.split(",").pop());
            newBody.append('type', fileType);
        //     // const blob = Buffer.from(event.target.result.split(",").pop(), 'base64');
        //     // convert the data to a blob
        //     const request = await fetch(event.target.result);
        //     const blobData = await request.blob();
        //     // const blob = new Blob([blobData], { type: `image/${fileExtension}` });
        //     const buffer = await blobData.arrayBuffer();
            newBody.append('data', event.target.files[0]);

            // await axios.post('https://api.imgbb.com/1/upload', body)
            //     .then(function (response) {
            //         console.log(response.data.data.display_url);
            //         setImageURL(response.data.data.display_url);

            //         navigate.push(`/create/?assetURL=${response.data.data.display_url}&assetType=image`);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //         alert(error);
            //     });

            await axios.post('/api/data', newBody)
                .then(function (response) {
                    let fileName = `${response.data.url}`
                    fileName = fileName.replace(/\s/g, ''); // remove white spaces
                    // remove the /api/data/ from the file name
                    fileName = fileName.replace('/api/data/', '');
                    console.log(response.data);
                    // console.log(response.data.data.display_url);
                    // setImageURL(response.data.data.display_url);


                    navigate.push(`/create/?assetFileName=${fileName}&assetType=${fileType}`);
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error);
                });
        // }
    }


    return (
        <>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Capture data in which format?</DrawerTitle>
                    {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
                <DrawerFooter>
                    <div className="flex justify-around items-center w-full h-full my-10">
                        <div className="flex flex-col items-center gap-3">
                            <input accept="image/*" id="camera-button" type="file" capture="environment" ref={photoRef} onChange={FileToURL} hidden />
                            <label htmlFor="camera-button">
                                {/* <DrawerClose> */}
                                <div className="relative z-10">
                                    <div className="bg-[#F1CC0A] p-4 rounded-3xl hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500 border border-black">
                                        <Image src={cameraIcon} alt="Camera" width={24} height={24} />
                                    </div>
                                    <div className="absolute h-full w-full bg-black top-1 left-1 -z-10 rounded-3xl"></div>
                                </div>
                                {/* </DrawerClose> */}
                            </label>
                            <span className="text-xs font-extrabold">Camera</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <input accept="audio/*" id="audio-button" type="file" ref={audioRef} onChange={FileToURL} hidden />
                            <label htmlFor="audio-button">
                                {/* <DrawerClose> */}
                                <div className="relative z-10">
                                    <div className="bg-[#F83D0C] p-4 rounded-3xl hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500 border border-black">
                                        <Image src={microphoneIcon} alt="Audio" width={24} height={24} />
                                    </div>
                                    <div className="absolute h-full w-full bg-black top-1 left-1 -z-10 rounded-3xl"></div>
                                </div>
                                {/* </DrawerClose> */}
                            </label>
                            {/* <Link href="/record/audio">
                                <DrawerClose>
                                    <div className="relative z-10">
                                        <div className="bg-[#F83D0C] p-4 rounded-3xl hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500 border border-black">
                                            <Image src={microphoneIcon} alt="Audio" width={24} height={24} />
                                        </div>
                                        <div className="absolute h-full w-full bg-black top-1 left-1 -z-10 rounded-3xl"></div>
                                    </div>
                                </DrawerClose>
                            </Link> */}
                            <span className="text-xs font-extrabold">Audio</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <input accept="video/*" id="video-button" type="file" ref={videoRef} onChange={FileToURL} hidden capture="user" />
                            <label htmlFor="video-button">
                                {/* <DrawerClose> */}
                                <div className="relative z-10">
                                    <div className="bg-[#EF435B] p-4 rounded-3xl hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500 border border-black">
                                        <Image src={playIcon} alt="Video" width={24} height={24} />
                                    </div>
                                    <div className="absolute h-full w-full bg-black top-1 left-1 -z-10 rounded-3xl"></div>
                                </div>
                                {/* </DrawerClose> */}
                            </label>
                            {/* <Link href="/record/video">
                                <DrawerClose>
                                    <div className="relative z-10">
                                        <div className="bg-[#EF435B] p-4 rounded-3xl hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500 border border-black">
                                            <Image src={playIcon} alt="Video" width={24} height={24} />
                                        </div>
                                        <div className="absolute h-full w-full bg-black top-1 left-1 -z-10 rounded-3xl"></div>
                                    </div>
                                </DrawerClose>
                            </Link> */}
                            <span className="text-xs font-extrabold">Video</span>
                        </div>
                    </div>
                    <DrawerClose>
                        <Button variant="outline" className="w-full">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </>
    )
}



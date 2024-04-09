"use client"

import PrimaryButton from "@/components/common/button/PrimaryButton";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useContext, useEffect, useRef } from "react";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder-2";


const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    if (!stream) {
        return (
            <>
                <div className="h-full w-full max-h-80 max-w-80 rounded-full border p-10 flex items-center justify-center">
                    <span className="text-sm text-gray-400">
                        Start recording to see the preview
                    </span>
                </div>
            </>
        )
    }
    return <video ref={videoRef} autoPlay className="w-full h-full rounded-2xl" />;
};


export default function RecordVideo() {
    const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
        useReactMediaRecorder({ video: true });

    const RecordedVideoDrawerContent = () => {
        return (
            <>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Recorded video</DrawerTitle>
                        <DrawerDescription>Check whether its good to go!</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex items-center justify-center p-4">
                        <video src={mediaBlobUrl} controls autoPlay className="rounded-2xl" />
                    </div>
                    <DrawerFooter className="w-full">
                        <div className="w-full flex justify-center">
                            <PrimaryButton text="Fill details" />
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </>
        )
    }

    return (
        <>
            <Drawer>
            <div className="py-5 px-4 mb-20 h-[100dvh] w-full">
                    <div className="flex items-center gap-3">
                        {
                            status === "stopped" ? (
                                <>
                                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                                </>
                            ) : status === "recording" ? (
                                <>
                                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                                </>
                            ) : (
                                <>
                                    <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                                </>
                            )
                        }
                        <h1 className="text-2xl">Record video</h1>
                    </div>
                    {/* <span className="text-sm text-gray-400">{status}</span> */}
                    <div className="h-4/5 flex items-center justify-center">
                        {
                            status === "stopped" ? (
                                <>
                                    {/* <div className="h-full w-full max-h-80 max-w-80 rounded-full border p-10 flex items-center justify-center">
                                        <span className="text-sm text-gray-400">
                                            Start recording to see the preview
                                        </span>
                                    </div> */}
                                    <div className="h-full w-full max-h-80 max-w-80 rounded-full border border-red-500 p-10 flex items-center justify-center">
                                        <span className="text-sm text-red-500">
                                            Recording has been stopped
                                        </span>
                                    </div>
                                </>
                            )
                                :
                                (
                                    <VideoPreview stream={previewStream} />
                                )
                        }
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <div onClick={startRecording}>
                            {/* <PrimaryButton text="Start recording" /> */}
                            <Button className="w-full bg-step-1 text-black border border-black">Start recording</Button>
                        </div>
                        <DrawerTrigger>
                            <Button variant="outline" className="w-full border-red-500 text-red-500" onClick={stopRecording}>Stop recording</Button>
                        </DrawerTrigger>
                    </div>
                </div>
                <RecordedVideoDrawerContent />
            </Drawer>
        </>
    );
}

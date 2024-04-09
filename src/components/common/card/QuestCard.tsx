"use client"

import Image from "next/image";
import PrimaryButton from "../button/PrimaryButton";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default function QuestCard() {
    return (
        <>
            <Dialog>
                <div className="py-4 px-4 border rounded-3xl flex flex-col items-center max-w-80 gap-5 w-full">
                    <Image src="https://www.earngather.xyz/pick.jpeg" alt="Quest" width={300} height={200} className="rounded-2xl" />
                    <div className="flex flex-col w-full gap-0.5">
                        <h2 className="text-lg font-semibold">
                            Quest Title
                        </h2>
                        <h3 className="text-gray-400 text-sm">
                            100 Points
                        </h3>
                    </div>
                    <DialogTrigger asChild>
                        <PrimaryButton text="Start now" />
                    </DialogTrigger>
                </div>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comming Soon!</DialogTitle>
                        <DialogDescription>
                            We are working hard to bring this feature to you. Stay tuned!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

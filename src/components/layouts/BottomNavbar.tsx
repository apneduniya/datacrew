"use client"

import Image from "next/image";
import Link from "next/link";
import homeIcon from "@/assets/images/home-icon.svg";
import highlightHomeIcon from "@/assets/images/highlight-home-icon.svg";
import questsIcon from "@/assets/images/quests-icon.svg";
import highlightQuestsIcon from "@/assets/images/highlight-quests-icon.svg";
import addIcon from "@/assets/images/add-icon.svg";
import leaderboardIcon from "@/assets/images/leaderboard-icon.svg";
import highlightLeaderboardIcon from "@/assets/images/highlight-leaderboard-icon.svg";
import userIcon from "@/assets/images/user-icon.svg";
import highlightUserIcon from "@/assets/images/highlight-user-icon.svg";

import { usePathname } from "next/navigation";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import DataCreateDrawerContent from "../sections/DataCreateDrawerContent";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


export default function BottomNavbar() {
    const pathname = usePathname();


    return (
        <>
            <div className="fixed z-50 w-full h-20 max-w-lg -translate-x-1/2 bg-white bottom-0 left-1/2 shadow-navbar-top rounded-t-3xl">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                    <Link href="/" className="flex justify-center items-center">
                        {/* <Image src={homeIcon} alt="Home" width={24} height={24} /> */}
                        {
                            pathname === "/" ?
                                <div className="inline-flex flex-col items-center justify-center px-5">
                                    <Image src={highlightHomeIcon} alt="Home" width={24} height={24} />
                                </div>
                                :
                                <div className="inline-flex flex-col items-center justify-center px-5">
                                    <Image src={homeIcon} alt="Home" width={24} height={24} />
                                </div>
                        }
                    </Link>
                    <Link href="/quests" className="flex justify-center items-center">
                        <div className="inline-flex flex-col items-center justify-center px-5">
                            {/* <Image src={questsIcon} alt="Quests" width={24} height={24} /> */}
                            {
                                pathname === "/quests" ?
                                    <Image src={highlightQuestsIcon} alt="Quests" width={24} height={24} />
                                    :
                                    <Image src={questsIcon} alt="Quests" width={24} height={24} />
                            }
                        </div>
                    </Link>
                    <div className="relative flex items-center justify-center">
                        <Drawer>
                            <DrawerTrigger>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center w-12 h-12 font-medium bg-step-1 rounded-2xl border border-black hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500">
                                        <Image src={addIcon} alt="Create data" width={24} height={24} className="text-white" />
                                    </div>
                                    <div className="absolute h-full w-full bg-black top-0.5 left-0.5 -z-10 rounded-2xl"></div>
                                </div>
                            </DrawerTrigger>
                            <DataCreateDrawerContent />
                        </Drawer>
                    </div>
                    <Link href="/leaderboard" className="flex justify-center items-center">
                        <div className="inline-flex flex-col items-center justify-center px-5 group">
                            {/* <Image src={leaderboardIcon} alt="Leaderboard" width={32} height={32} /> */}
                            {
                                pathname === "/leaderboard" ?
                                    <Image src={highlightLeaderboardIcon} alt="Leaderboard" width={32} height={32} />
                                    :
                                    <Image src={leaderboardIcon} alt="Leaderboard" width={32} height={32} />
                            }
                        </div>
                    </Link>
                    <Link href="/account" className="flex justify-center items-center">
                    {/* <WalletMultiButton> */}
                        <div className="inline-flex flex-col items-center justify-center px-5 rounded-e-full group">
                            {/* <Image src={userIcon} alt="Account" width={20} height={20} /> */}
                            {
                                pathname === "/account" ?
                                    <Image src={highlightUserIcon} alt="Account" width={20} height={20} />
                                    :
                                    <Image src={userIcon} alt="Account" width={20} height={20} />
                            }
                        </div>
                    {/* </WalletMultiButton> */}
                    </Link>

                </div>
            </div>
        </>
    );
}




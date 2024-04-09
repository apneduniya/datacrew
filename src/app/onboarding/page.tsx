"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function OnboardingLayout() {

    const wallet = useAnchorWallet();
    const navigate = useRouter();


    useEffect(() => {
        if (wallet?.publicKey) {
            navigate.push("/");
        }
    }, [wallet, navigate])

    return (
        <>
            <div className="h-[100dvh] w-full flex flex-col items-center justify-center py-5 px-4 gap-20">
                <div className="flex flex-col items-center">
                    <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_kkflmtur.json" background="transparent" speed="1" style={{ height: 320, width: 320 }} loop autoplay></lottie-player>
                    <h1 className="mt-10 text-left w-full text-2xl font-extrabold">Welcome to DataCrew!</h1>
                    <p className="mt-2 text-justify text-gray-400">A data-to-earn platform emporing you to earn rewards by contributing data.</p>
                </div>
                <WalletMultiButton />
            </div>
        </>
    )
}



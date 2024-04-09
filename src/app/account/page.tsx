"use client"

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Account() {
  const wallet = useAnchorWallet();
  const navigate = useRouter();

  useEffect(() => {
    if (!wallet?.publicKey) {
        navigate.push("/onboarding");
    }
}, [wallet, navigate])
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <WalletMultiButton />
    </div>
  );
}

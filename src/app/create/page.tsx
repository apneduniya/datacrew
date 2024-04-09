"use client"


import PrimaryButton from "@/components/common/button/PrimaryButton";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ConnectionProvider, WalletProvider, useAnchorWallet, useWallet as useAdapterWallet, AnchorWallet, WalletContext } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import idl from "@/assets/data/idl.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import Image from "next/image";
import { ParticleAdapterConfig, ParticleAdapter } from "@solana/wallet-adapter-wallets";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Drawer,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { title } from "process";
import Link from "next/link";


export default function Create() {
  const searchParams = useSearchParams();
  let assetURL = searchParams.get("assetFileName");
  assetURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/data/` + assetURL;
  const assetType = searchParams.get("assetType");
  const [airDrop, setAirDrop] = useState(false);
  const [state, setState] = useState({ title: "", description: "" });

  const connection = new Connection("https://api.devnet.solana.com");

  // const { connection } = useConnection();
  const wallet = useAnchorWallet();

  function getProvider() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const provider = new AnchorProvider(connection, wallet as AnchorWallet, { "preflightCommitment": "confirmed" });

    return provider;
  }

  async function saveData() {

    console.log("Saving data...");

    const provider = getProvider();
    const a = JSON.stringify(idl);
    const b = JSON.parse(a);
    const program = new Program(b, idl.metadata.address, provider);

    console.log("Program...");

    let dataAccountKP = web3.Keypair.fromSecretKey(new Uint8Array(process.env.NEXT_PUBLIC_DATA_ACCOUNT_SECRET_KEY.split(",").map(Number)));
    console.log(dataAccountKP.publicKey.toString());

    let pointsAccountKP = web3.Keypair.fromSecretKey(new Uint8Array(process.env.NEXT_PUBLIC_POINTS_ACCOUNT_PUBLIC_KEY.split(",").map(Number)));
    console.log(pointsAccountKP.publicKey.toString());

    // const user = web3.Keypair.generate();
    // console.log(user.publicKey.toString());

    console.log("Saving data...");

    console.log("Wallet Pubkey: ", wallet?.publicKey.toString());

    const txHash = await program.methods.saveData(formData.title, formData.description, formData.labels, formData.assetURL, formData.assetType)
      .accounts({ assetData: dataAccountKP.publicKey, user: wallet?.publicKey, userPoints: pointsAccountKP.publicKey })
      .signers([dataAccountKP, pointsAccountKP])
      .rpc();

    // const txid = await wallet?.signTransaction(txHash);

    console.log(txHash);

    if (txHash) {
      setState({ title: "Data saved successfully!", description: <span>You can <Link className="underline text-blue-600" target="_blank" href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}>view the transaction in solscan</Link>.</span> });
    }

  }


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    labels: "",
    assetType: assetType,
    assetURL: searchParams.get("assetFileName"),
  });


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);

    setState({ title: "In process...", description: "Please wait don't go away. It will just take few seconds!" });

    await saveData();
  }

  // console.log(process.env.NEXT_PUBLIC_POINTS_ACCOUNT_PUBLIC_KEY.split(",").map(Number));

  useEffect(() => {

    const airDropDone = localStorage.getItem("airDropDone");

    if (wallet && !airDrop && !airDropDone) {
      try {
        connection.requestAirdrop(wallet?.publicKey as PublicKey, 1e9);
        setAirDrop(true);
        localStorage.setItem("airDropDone", "true");
      } catch (error) {
        setAirDrop(true);
        localStorage.setItem("airDropDone", "true");
      }
    }
  }, [wallet]);

  return (
    <>
      <Drawer>
        <div className="py-5 px-4 h-[100dvh] w-full  items-center mb-20 flex flex-col gap-5">
          <div>
            <h1 className="mb-5">Fill the details of the data you captured.</h1>
            {
              assetType === "image" ? (
                <Image src={assetURL as string} alt="asset" className="!w-full !h-auto rounded-lg" width="300" height="100" />
              ) : assetType === "video" ? (
                <video src={assetURL as string} className="!w-full !h-auto rounded-lg" controls />
              ) : (
                <audio src={assetURL as string} className="!w-full !h-auto rounded-lg" controls />
              )
            }
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2 mt-5 items-center justify-center">
              <Input placeholder="Title" value={formData.title ? formData.title : ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full" />
              <Input placeholder="Description" value={formData.description ? formData.description : ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full" />
              <Input placeholder="Labels" value={formData.labels ? formData.labels : ""} onChange={(e) => setFormData({ ...formData, labels: e.target.value })} className="w-full mb-7" />
              <DrawerTrigger type="submit">
                <div className="relative z-10 w-full h-full">
                  <div className="w-full max-w-80 text-sm bg-step-1 py-3 px-10 text-center border border-black font-bold rounded-xl hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500">
                    Submit
                  </div>
                  <div className="w-full max-w-80 h-full absolute bg-black top-1.5 left-1.5 rounded-xl -z-10"></div>
                </div>
              </DrawerTrigger>
            </form>
          </div>
        </div>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{state.title}</DrawerTitle>
            <DrawerDescription>{state.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full border border-red-500 text-red-500">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

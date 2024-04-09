"use client"

import Image from "next/image";
import announcementImg from "@/assets/images/announcement_v_2.png";
import QuestCard from "@/components/common/card/QuestCard";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, BN, Program, web3 } from "@project-serum/anchor";
import idl from "@/assets/data/idl.json";
import { useEffect, useState } from "react";
import BottomNavbar from "@/components/layouts/BottomNavbar";
import { useRouter } from "next/navigation";

export default function Home() {

  const [points, setPoints] = useState("-");
  const navigate = useRouter();

  const greetings = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good morning";
    } else if (hours < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  const wallet = useAnchorWallet();

  const getPoints = async () => {

    console.log(wallet?.publicKey.toString());

    if (!wallet) return;

    console.log("Getting points...");

    function getProvider() {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const provider = new AnchorProvider(connection, wallet as AnchorWallet, { "preflightCommitment": "confirmed" });

      return provider;
    }

    const provider = getProvider();
    const a = JSON.stringify(idl);
    const b = JSON.parse(a);
    const program = new Program(b, idl.metadata.address, provider);

    const points: Array<object> = await program.account.userPoints.all();
    for (let i = 0; i < points.length; i++) {
      console.log(points[i]);
      console.log(points[i].account.owner);
      const points_owner = points[i].account.owner;
      let num = new BN(0); // just create something
      num.words = points_owner._bn.words;
      num.length = points_owner._bn.length;
      num.red = points_owner._bn.red;
      num.negative = points_owner._bn.negative;
      const publicKey = new PublicKey(num);

      console.log(publicKey.toString());

      if (publicKey.equals(wallet?.publicKey)) {
        const point = points[i].account.point;
        console.log(point.toString());

        setPoints(point.toNumber());

        break;
      } else {
        setPoints("0");
      }

    }

    // console.log(points);
  }

  useEffect(() => {
    getPoints();
  }, [wallet]);


  useEffect(() => {
      if (!wallet?.publicKey) {
          navigate.push("/onboarding");
      }
  }, [wallet, navigate])

  return (
    <div className="py-5 px-4 flex flex-col gap-8">
      <h1 className="text-xl bold">{greetings()},<br />Adarsh</h1>
      <section>
        <Image src={announcementImg} alt="Announcement" className="w-full rounded-3xl" />
      </section>
      <section className="w-full h-full flex items-center justify-center gap-10 my-2=1">
        <div className="flex flex-col items-center">
          <span className="text-2xl">{points != "-" ? Number(points) / 7 : "-"}</span>
          <span className="text-sm">Data shared</span>
        </div>
        <hr className="h-10 w-0.5 bg-gray-200" />
        <div className="flex flex-col items-center">
          <span className="text-2xl">{points}</span>
          <span className="text-sm">Points</span>
        </div>
      </section>
      <section className="mt-5">
        <h1 className="text-xl">Continue quests</h1>
        <div className="flex w-full h-40 justify-center items-center">
          <h1 className="text-gray-400">
            Comming Soon...
          </h1>
        </div>
      </section>
      <BottomNavbar />
    </div>
  );
}

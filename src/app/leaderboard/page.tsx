"use client"

import LeaderboardSection from "@/components/sections/LeaderboardSection";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, BN, Program, web3 } from "@project-serum/anchor";
import idl from "@/assets/data/idl.json";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [user, setUser] = useState<Array<object>>([]);

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

    const points: Array<object | any> = await program.account.userPoints.all();
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

      const point = points[i].account.point;
      console.log(point.toString());

      // console.log(publicKey.toString(), "11111111111111111111111111111111");

      if (publicKey.toString()==="11111111111111111111111111111111") {
        continue;
      }

      const owner = publicKey.toString().slice(0, 4) + "..." + publicKey.toString().slice(-4);

      setUser((prev) => [...prev, { owner: owner, point: point.toString() }]);

    }

    // points ranking logic
    setUser((prev) => prev.sort((a: any, b: any) => parseInt(b.point) - parseInt(a.point)));

    // console.log(points);
  }

  useEffect(() => {
    getPoints();
  }, [wallet]);

  return (
    <div className="py-5 px-4">
      <h1 className="text-2xl">Leaderboard</h1>
      <LeaderboardSection user={user} />
    </div>
  );
}

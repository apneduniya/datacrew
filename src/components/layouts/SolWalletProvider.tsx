"use client"

import { useEffect, useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ParticleAdapterConfig, ParticleAdapter } from "@solana/wallet-adapter-wallets";
import {
    WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const SolWalletProvider = (props: { children: React.ReactNode }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.

    const wallets = useMemo(
        () => [
            new ParticleAdapter({
                config: {
                    projectId: process.env.NEXT_PUBLIC_PARTICLE_APP_PROJECT_ID,
                    clientKey: process.env.NEXT_PUBLIC_PARTICLE_APP_CLIENT_KEY,
                    appId: process.env.NEXT_PUBLIC_PARTICLE_APP_APP_ID,
                    chainName: 'solana',
                    chainId: 101,
                },
                // Extended functionality
                // preferredAuthType: {
                //   type: 'google', setAsDisplay: true
                // },
                // }
            } as ParticleAdapterConfig
            )
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {props.children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default SolWalletProvider;
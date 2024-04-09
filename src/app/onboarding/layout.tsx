import type { Metadata } from "next";
import "@/app/globals.css";
import BottomNavbar from "@/components/layouts/BottomNavbar";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Onboarding | Datacrew",
    description: "Datacrew is a data-to-earn platform.",
};

export default function OnboardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
            <main>
                {children}
            </main>
            {/* <BottomNavbar /> */}
        </>
    );
}

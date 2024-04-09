import type { Metadata } from "next";
import "@/app/globals.css";
import BottomNavbar from "@/components/layouts/BottomNavbar";

export const metadata: Metadata = {
  title: "Record Audio | Datacrew",
  description: "Datacrew is a data-to-earn platform.",
};

export default function RecordAudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <main>
          {children}
        </main>
        {/* <BottomNavbar /> */}
    </>
  );
}

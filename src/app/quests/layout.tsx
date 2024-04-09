import type { Metadata } from "next";
import "@/app/globals.css";
import BottomNavbar from "@/components/layouts/BottomNavbar";

export const metadata: Metadata = {
  title: "Quests | Datacrew",
  description: "Datacrew is a data-to-earn platform.",
};

export default function QuestsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <main>
          {children}
        </main>
        <BottomNavbar />
    </>
  );
}

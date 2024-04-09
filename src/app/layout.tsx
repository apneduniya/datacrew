import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import BottomNavbar from "@/components/layouts/BottomNavbar";
import { cn } from "@/lib/utils"
import SolWalletProvider from "@/components/layouts/SolWalletProvider";

const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Datacrew",
  description: "Datacrew is a data-to-earn platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "font-sans antialiased",
        unbounded.variable
      )}>
      <SolWalletProvider>
          <main>
            {children}
          </main>
        </SolWalletProvider>
        {/* <BottomNavbar /> */}
      </body>
    </html>
  );
}

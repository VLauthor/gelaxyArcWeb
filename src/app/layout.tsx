import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NavigationMenuGeneral } from "@/components/local/general/header";
import MonopolyGame from "@/components/test/mono";
import MiniDota from "@/components/test/MiniDota";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  // Можно указать нужные веса, например
  // weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "VMeste",
  description: "Генеральная сраница",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${roboto.variable} antialiased flex flex-col items-center`}
      >
        <NavigationMenuGeneral />
        {children}
      </body>
    </html>
  );
}

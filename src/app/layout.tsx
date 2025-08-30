import GradualBlurMemo from "@/components/pages/general/components/gradual-blur";
import { NavigationMenuGeneral } from "@/components/pages/general/components/NavBar/Navnar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
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
        <div style={{ height: '100%', overflowY: 'auto', padding: '' }}>


          <NavigationMenuGeneral />
          {/* <CustomCursor
            spinDuration={2}
            hideDefaultCursor={true}
          /> */}
          {/* <SmoothCursor /> */}
          {/* <Pointer className="fill-[var(--ring)]" /> */}
          {children}
        </div>
        <GradualBlurMemo
          className="z-50"
          height="2rem"
          curve="ease-in-out"
          target="page"
        />
      </body>
    </html >
  );
}

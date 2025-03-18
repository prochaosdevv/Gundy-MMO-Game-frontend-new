import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import {Providers} from "./providers"
import ContractContextProvider from "@/contexts/ContractContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gundy MMO",
  description: "Gundy MMO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Providers >
     <ContractContextProvider>
    {children}
     </ContractContextProvider>
     </Providers>
     
     
      </body>
    </html>
  );
}

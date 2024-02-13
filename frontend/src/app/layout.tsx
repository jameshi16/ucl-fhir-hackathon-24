import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UIProvider from "./uiprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FHIR NHS Queueing App",
  description: "Intelligent Queueing for the NHS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}

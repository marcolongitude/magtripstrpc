import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TrpcProvider } from "../utils/trpc-provider";

export const metadata: Metadata = {
  title: "Viagens TecMAR",
  description: "Generated by Marco Aurélio Guimarães",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TrpcProvider>
          <div>{children}</div>
        </TrpcProvider>
      </body>
    </html>
  );
}

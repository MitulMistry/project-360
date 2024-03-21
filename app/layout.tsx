import "normalize.css";
import type { Metadata } from "next";
import NextAuthProvider from "./context/next-auth-provider";
import { Inter } from "next/font/google";
import "@styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project 360",
  description: "Project management application",
};

// Use SessionProvider (in NexAuthProvider) to persist user's authentication across the application.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}

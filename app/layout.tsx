import "normalize.css";
import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import NextAuthProvider from "@/app/context/next-auth-provider";
import { Inter } from "next/font/google";
import "@styles/global.scss";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appMetadata.title,
  description: appMetadata.description,
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

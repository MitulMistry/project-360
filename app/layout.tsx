import "normalize.css";
import { Inter } from "next/font/google";
import "@styles/global.scss";
import type { Metadata } from "next";
import { appMetadata } from "@/app/lib/app-metadata";
import NextAuthProvider from "@/app/context/next-auth-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryClientWrapper from "@api/query-client-wrapper";

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
        <QueryClientWrapper>
          <NextAuthProvider>{children}</NextAuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientWrapper>
      </body>
    </html>
  );
}

// import { NextApiHandler } from "next";
import NextAuth from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GitHubProvider from "next-auth/providers/github";
// import prisma from "@/lib/prisma";
import { authOptions } from "@/app/lib/authOptions";

// There type incompatibilities between NextAuth and Next API response types that currently
// cannot be resolved in TypeScript. So leave this as a JavaScript file.
// https://github.com/nextauthjs/next-auth/issues/8243

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
const authHandler = (req, res) => NextAuth(req, res, authOptions);
// export default authHandler;

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.SECRET,
// };

export { authHandler as GET, authHandler as POST };

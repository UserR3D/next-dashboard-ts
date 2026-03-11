import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession, NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import { prisma } from "./prisma";

if (!process.env.AUTH_GITHUB_ID|| !process.env.AUTH_GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables")
}

export const authOptions : NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        })
    ],
    adapter: PrismaAdapter(prisma)
}

export function auth(...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
){
    return getServerSession(...args, authOptions)
}
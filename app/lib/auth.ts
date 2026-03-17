import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession, NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

if (!process.env.AUTH_GITHUB_ID|| !process.env.AUTH_GITHUB_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables")
}

export const authOptions : NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "john@gmail.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password){
                    throw new Error("Invalid email or password")
                }
                const user = await prisma.user.findUnique({where: {email: credentials.email}})
                if(!user) throw new Error("User don't exist in database")
                const valid = await bcrypt.compare(credentials.password, user.password!)
                if(!valid) throw new Error("Invalid password")
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
        }),
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        })
    ],
    session: {
        strategy: "database",
    },
    adapter: PrismaAdapter(prisma)
}

export function auth(...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
){
    return getServerSession(...args, authOptions)
}
"use client"
import { getServerSession } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "../lib/auth";

export default function Home(){
  const { data: session } = useSession()
    return(
        <div>
            <SessionProvider session={session}>
            <button
            onClick={() => signIn()}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
            Login
            </button>
            <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
            LogOut
            </button>
            <button
            onClick={() => signIn("credentials")}>
            Login normal
            </button>
            <h1>{session?.user?.email}</h1>
            <h1>{session?.user?.name}</h1>
            <h1>{session?.user?.image}</h1>
            </SessionProvider>
        </div>
    )
}
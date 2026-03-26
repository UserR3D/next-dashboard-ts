"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home(){
  const { data: session } = useSession()
  console.log(session?.user.image)
    return(
        <div>
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
            <h1>{session?.user?.email}</h1>
            <h1>{session?.user?.name}</h1>
            {session?.user.image ? <Image alt="user profile" src={session.user.image} width={400} height={400}/> : ""}
        </div>
    )
}
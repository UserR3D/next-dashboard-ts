'use client'
import { signIn, signOut } from "next-auth/react";

export default function Home(){
    return(
        <div>
            <button
            onClick={() => signIn("github")}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
            ASDaSD
            </button>
            <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
            LogOut
            </button>
            <h1>teste</h1>
        </div>
    )
}
import { prisma } from "@/app/lib/prisma";
import { handleServer } from "@/app/lib/serverHandling";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function serviceAuth(email: string, password: string){
    const user = await prisma.user.findUnique({where: {email}})
    const isMatch = user && (await bcrypt.compare(password, user.password))
    if(!user || !isMatch) {
        const errorEmail = handleServer<ErrorApi>({error: "Invalid inputs", message: "Email or password wrong"}, 400)
        return errorEmail
    }
    const payload = {
        id: user?.id,
        email: user?.email,
        name: user?.name
    }
    const token = await encode({
    token: payload,
    secret: process.env.AUTH_SECRET!
  })
    const res = NextResponse.json(payload)
    res.cookies.set("next-auth.session-token", token, {
    httpOnly: true,
    path: "/"
  })
    return res
}
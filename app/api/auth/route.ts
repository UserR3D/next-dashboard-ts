import { encode } from "next-auth/jwt";
import { serviceAuth } from "../services/service_auth"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const response = await serviceAuth(email, password);
  if(!response.user) return null
   const token = await encode({
    token: response.payload,
    secret: process.env.AUTH_SECRET!,
  })
  const res = NextResponse.json({sucess: true})

  res.cookies.set("next-auth.session-token", token, {
    httpOnly: true,
    path: "/"
  })
  return NextResponse.json(response.payload)
}

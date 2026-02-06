import { NextRequest, NextResponse } from "next/server";
import { serviceAddUser, serviceGetUsers } from "./services/service_user";
import bcrypt from "bcryptjs";

export async function GET() {
  const users = await serviceGetUsers();
  return new NextResponse(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: NextRequest){
  const {email, name, password} = await request.json() as UserNextApi
  const passwordHash = bcrypt.hashSync(password, 10)
  const users = await serviceAddUser(email, passwordHash, name ?? '')
  return new NextResponse(JSON.stringify(users), {status: users.status})
}



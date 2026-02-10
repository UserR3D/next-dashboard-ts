import { NextRequest } from "next/server";
import { serviceAddUser, serviceGetUsers } from "./services/service_user";
import bcrypt from "bcryptjs";

export async function GET() {
  return await serviceGetUsers();
}

export async function POST(request: NextRequest){
  const {email, name, password} = await request.json() as UserNextApi
  const passwordHash = bcrypt.hashSync(password, 10)
  return await serviceAddUser(email, passwordHash, name ?? '')
}



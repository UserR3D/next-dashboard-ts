import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { serviceAddUser, serviceGetUsers } from "../services/service_user";
import handleServer from "@/app/lib/serverHandling";

export async function GET() {
  return handleServer(await serviceGetUsers(), 200);
}

export async function POST(request: NextRequest){
  const {email, name, password} = await request.json() as UserNextApi
  const passwordHash = bcrypt.hashSync(password, 10)
  return await serviceAddUser(email, passwordHash, name ?? '')
}



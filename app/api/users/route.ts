import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { serviceAddUser, serviceGetUsers } from "../services/service_user";
import {handleServer} from "@/app/lib/serverHandling";

export async function GET() {
  return handleServer(await serviceGetUsers(), 200);
}

export async function POST(request: NextRequest){
  const {email, name, password} = await request.json() as UserNextApi
  if(!password || !email) return handleServer<ErrorApi>({error: "Invalid Credentials", message: "Email or password incorrectly"}, 400)
  const passwordHash = bcrypt.hashSync(password, 10)
  return await serviceAddUser(email, passwordHash, name ?? '')
}


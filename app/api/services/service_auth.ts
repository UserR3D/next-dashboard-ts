import { prisma } from "@/app/lib/prisma";
import { handleServer } from "@/app/lib/serverHandling";
import bcrypt from "bcryptjs";

export async function serviceAuth(email: string, password: string){
    const user = await prisma.user.findUnique({where: {email}})
    const isMatch = user && (await bcrypt.compare(password, user.password))
    if(!user || !isMatch) handleServer({error: "Invalid inputs", message: "Email or password wrong"}, 400)
    const payload = {
        id: user?.id,
        email: user?.email
    }
    return {user, isMatch, payload}
}
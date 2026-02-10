import { prisma } from "@/app/lib/prisma";
import handleServer from "@/app/lib/serverHandling";

export async function serviceGetUsers(){
    return handleServer(await prisma.user.findMany(), 200)
}

export async function serviceAddUser(email : string, passwordHash : string, name? : string) {
    const existingEmail = await prisma.user.findUnique({where: {email}})
    
    if(existingEmail){
        const errorEmail = handleServer<ErrorApi>({error: "Conflict", message: "Email already exists"}, 409)
        return errorEmail
    }
    const createdUser = handleServer<UserNextApi>( await prisma.user.create({
        data: {
            email,
            password: passwordHash,
            name
        }
    }), 200)
    return createdUser
}


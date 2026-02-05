import { prisma } from "@/app/lib/prisma";

export async function serviceGetUsers(){
    return await prisma.user.findMany()
}

export async function serviceAddUser(email : string, passwordHash : string, name? : string) {
    const existingUser = await prisma.user.findUnique({where: {email}})
    if(existingUser){
        throw new Error("Email already exists")
    }
    return await prisma.user.create({
        data: {
            email,
            password: passwordHash,
            name
        }
    })
}


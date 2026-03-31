import { prisma } from "@/app/lib/prisma";
import {handleServer} from "@/app/lib/serverHandling";
import bcrypt from "bcryptjs";

export async function serviceGetUsers(){
    return await prisma.user.findMany({include: {customImage: true}})
}

export async function serviceAddUser(email : string, password : string, name? : string) {
  const passwordHash = bcrypt.hashSync(password, 10)
    const existingEmail = await prisma.user.findUnique({where: {email}})
    if(existingEmail){
        const errorEmail = handleServer<ErrorApi>({error: "Conflict", message: "Email already exists"}, 409)
        return errorEmail
    }
    const createdUser = handleServer<UserNextApi>(await prisma.user.create({
        data: {
            email,
            password: passwordHash,
            name, 
        }
    }), 200)
    return createdUser
}

export async function serviceDelete(id: string){
    const prismaFind = await prisma.user.findUnique({where: {id} })
    if(!prismaFind){
        return handleServer({error: "ID don't exist", message: "User don`t exists in database"}, 400)
    }
   const deleteUser = await prisma.user.delete({where: {id}})
    return handleServer(deleteUser, 200)
}

export async function serviceUpdate(id: string, password?: string, name?: string, email?: string){
    const prismaFind = await prisma.user.findUnique({where: {id}})
    if(!prismaFind){
        return handleServer({error: "ID don't exist", message: "User don`t exists in database"}, 400)
    }
    const updateUser = await prisma.user.update({where: {id}, data: {name, password, email}})
    return updateUser
}

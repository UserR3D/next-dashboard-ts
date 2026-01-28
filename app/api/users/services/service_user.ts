import { prisma } from "@/app/lib/prisma";

export async function serviceUser(){
    return await prisma.user.findMany()
}

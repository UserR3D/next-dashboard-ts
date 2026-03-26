import { authOptions } from "@/app/lib/auth";
import cloudinary from "@/app/lib/cloudinary";
import { prisma } from "@/app/lib/prisma";
import { UploadApiResponse } from "cloudinary";
import { getServerSession } from "next-auth";

export async function POST(req: Request){
    const session = await getServerSession(authOptions);

    if(!session?.user?.email) {
        return new Response("Unauthorized", {status: 401})
    }
    
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if(!file) {
        return new Response("No file", {status: 400})
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes)

    const upload = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "users" },
            (error, result) => {
                if(error) reject(error);
                else resolve(result as UploadApiResponse)
            }
        ).end(buffer)
    })

    const user = await prisma.user.findUniqueOrThrow({
        where: { email: session.user.email }
    })

    await prisma.image.upsert({
        where: { userId: user.id },
        update: {
            publicId: upload.public_id,
            url: upload.secure_url,
            format: upload.format,
            version: upload.version
        },
        create: {
            publicId: upload.public_id,
            url: upload.secure_url,
            format: upload.format,
            version: upload.version,
            userId: user.id
        }
    })

    return Response.json({ url: upload.secure_url })
}
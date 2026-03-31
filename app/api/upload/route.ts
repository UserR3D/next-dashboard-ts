import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { serviceCloud } from "../services/serviceCloud";
import { uploadFileImage } from "@/app/lib/uploaderCloud";

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

    const upload = await uploadFileImage(buffer)

    const serviceResponse = await serviceCloud(session, upload)

    return Response.json({ url: upload.secure_url, api: serviceResponse })
}
'use server'
import {v2 as cloudinary} from "cloudinary"
import { prisma } from "./prisma";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export async function uploadImage(formData: FormData) {
  const file = formData.get("image") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  await prisma.image.create({
    data: {
      url: result.secure_url,
      publicId: result.public_id
    }
  });
}
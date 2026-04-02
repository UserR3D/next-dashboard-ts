import { prisma } from '@/lib/prisma';
import { UploadApiResponse } from 'cloudinary';
import { Session } from 'next-auth';

export async function serviceCloud(
	session: Session,
	upload: UploadApiResponse,
) {
	const user = await prisma.user.findUniqueOrThrow({
		where: { email: session.user.email! },
	});

	const teste = await prisma.image.findFirst({ where: { userId: user.id } });
	console.log(teste);
	await prisma.image.upsert({
		where: { userId: user.id },
		update: {
			publicId: upload.public_id,
			url: upload.secure_url,
			format: upload.format,
			version: upload.version,
		},
		create: {
			publicId: upload.public_id,
			url: upload.secure_url,
			format: upload.format,
			version: upload.version,
			userId: user.id,
		},
	});
}

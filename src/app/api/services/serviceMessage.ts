import { prisma } from '@/lib/prisma';

export async function serviceMessage(id: string, content: string) {
	return await prisma.message.create({
		data: {
			content,
			userId: id,
		},
	});
}

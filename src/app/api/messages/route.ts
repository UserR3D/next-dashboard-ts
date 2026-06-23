import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { serviceMessage } from '../services/serviceMessage';
import { handleServer } from '@/lib/serverHandling';

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);
	const { content } = await request.json();
	if (!session?.user?.id) {
		return Response.json(handleServer({ error: `Don't authenticated` }, 401));
	}
	const messageCreated = serviceMessage(session.user.id, content);
	return Response.json(messageCreated);
}

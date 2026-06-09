import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { serviceMessage } from '../services/serviceMessage';

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);
	const { content } = await request.json();
	if (!session?.user?.id) {
		return null;
	}
	return Response.json(serviceMessage(session.user.id, content));
}

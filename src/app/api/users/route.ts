import { NextRequest } from 'next/server';
import { serviceAddUser, serviceGetUsers } from '../services/serviceUser';
import { handleServer } from '@/lib/serverHandling';

export async function GET() {
	return handleServer(await serviceGetUsers(), 200);
}

export async function POST(request: NextRequest) {
	const { email, name, password } = (await request.json()) as UserNextApi;
	if (!password || !email)
		return handleServer<ErrorApi>(
			{
				error: 'Invalid Credentials',
				message: 'Email or password incorrectly',
			},
			400,
		);
	return await serviceAddUser(email, password, name ?? '');
}

import { NextRequest } from 'next/server';
import { serviceDelete, serviceUpdate } from '../../services/serviceUser';
import bcrypt from 'bcryptjs';
import { handleServer } from '@/lib/serverHandling';

interface RouteParams {
	params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
	const { id } = await params;
	return await serviceDelete(id);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
	const { id } = await params;
	const { email, name, password } = (await request.json()) as UserNextApi;
	if (!password)
		return handleServer<ErrorApi>(
			{ error: 'Invalid Credentials', message: 'Name or password incorrectly' },
			400,
		);
	const passwordHash = bcrypt.hashSync(password, 10);
	const updateUser = await serviceUpdate(
		id,
		passwordHash ?? null,
		name ?? '',
		email ?? '',
	);
	return handleServer(updateUser, 200);
}

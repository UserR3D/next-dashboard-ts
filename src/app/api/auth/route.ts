import { serviceAuth } from '../services/serviceAuth';

export async function POST(req: Request) {
	const { email, password } = await req.json();
	const response = await serviceAuth(email, password);
	return response;
}

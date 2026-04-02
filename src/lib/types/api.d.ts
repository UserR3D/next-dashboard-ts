type UserNextApi = {
	id: string;
	name: string | null;
	email: string | null;
	password: string | null;
};

interface UserResponseApi extends UserNextApi {
	emailVerified: string | null;
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
}

interface ErrorApi {
	error?: string;
	message?: string;
}

interface RouteParams {
	params: Promise<{ id: string }>;
}

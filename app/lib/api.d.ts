interface UserNextApi {
    id: number,
    email: string,
    password: string
    name?: string | undefined | null,
}

interface ErrorApi {
    error?: string,
    message?: string
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

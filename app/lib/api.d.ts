type UserNextApi = {
  id: string
  email: string | null
  name: string | null
  password: string | null
}
interface ErrorApi {
    error?: string,
    message?: string
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

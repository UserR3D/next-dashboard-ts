import { serviceAuth } from "../services/service_auth"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const response = await serviceAuth(email, password);
  return response
}

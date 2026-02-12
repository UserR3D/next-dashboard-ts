// import { NextRequest } from "next/server";
// import { serviceAuth } from "../services/service_auth";
// import { handleServer } from "@/app/lib/serverHandling";
// import { cookies } from "next/headers";

// export async function POST(request: NextRequest){

//     const {email, password} = await request.json() as UserNextApi;
//     const response = serviceAuth(email, password);
//     (await cookies()).set('token', (await response).user)
//     return handleServer((await response).payload, 200)
// }
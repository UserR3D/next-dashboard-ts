import { serviceUser } from "./services/service_user";

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  // const users = [
  //   { id: 1, name: 'Alice' },
  //   { id: 2, name: 'Bob' },
  // ];
  
  const users = await serviceUser();

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

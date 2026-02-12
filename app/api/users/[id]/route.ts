import { NextRequest, } from 'next/server';
import { serviceDelete, serviceUpdate } from '../../services/service_user';
import { handleServer } from '@/app/lib/serverHandling';
import bcrypt from "bcryptjs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest,{ params }: RouteParams) {
  const {id} = await params;
  return await serviceDelete(+id)
}

export async function PUT(request: NextRequest, {params} : RouteParams){
  const {id} = await params;
  const {name, password} = await request.json() as UserNextApi;
  const passwordHash = bcrypt.hashSync(password, 10)
  const updateUser = await serviceUpdate(+id, passwordHash, name ?? "",);
  return handleServer(updateUser, 200)
}
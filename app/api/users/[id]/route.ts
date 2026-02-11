import { NextRequest, } from 'next/server';
import { serviceDelete } from '../../services/service_user';
import bcrypt from "bcryptjs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE({ params }: RouteParams) {
  const { id } = await params;
  return await serviceDelete(+id)
}

export async function PUT(request: NextRequest, {params} : RouteParams){
  const {id} = await params;
  const {name, password} = await request.json() as UserNextApi ;
  return await serviceUpdatre(+id, name, password);
}
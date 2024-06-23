import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getUserByUser } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getUserByUser(user.id).then((data) => NextResponse.json(data));
}

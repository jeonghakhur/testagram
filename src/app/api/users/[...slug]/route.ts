import { getLikedPostOf, getPostOf, getSavedPostOf } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [userId, query] = slug;

  let request = getPostOf;
  if (query === 'saved') {
    request = getSavedPostOf;
  }
  if (query === 'liked') {
    request = getLikedPostOf;
  }

  return request(userId).then((data) => NextResponse.json(data));
}

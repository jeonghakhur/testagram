'use client';

import { SimplePost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import PostListCard from './PostListCard';

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  { ssr: false }
);

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  return (
    <section>
      {loading && (
        <div className="flex justify-center py-20">
          <GridLoader color="red" />
        </div>
      )}
      {posts && (
        <div>
          {posts.map((post, index) => (
            <PostListCard post={post} key={post.id} priority={index < 2} />
          ))}
        </div>
      )}
    </section>
  );
}

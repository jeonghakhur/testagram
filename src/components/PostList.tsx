'use client';

import { SimplePost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';
import PostListCard from './PostListCard';
import GridLoader from './GridLoader';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  return (
    <section>
      {loading && <GridLoader />}
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

'use client';

import { SimplePost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';
// import { GridLoader } from 'react-spinners';
import PostListCard from './PostListCard';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  return (
    <section>
      {loading && (
        <div className="flex justify-center py-20">
          {/* <GridLoader color="red" /> */}
        </div>
      )}
      {posts && (
        <div>
          {posts.map((post) => (
            <PostListCard post={post} key={post.id} />
          ))}
        </div>
      )}
    </section>
  );
}

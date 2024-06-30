'use client';

import React from 'react';
import usePosts from '@/hooks/posts';
import PostListCard from './PostListCard';
import GridLoader from './GridLoader';

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();
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

'use client';

import { SimplePost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  // console.log(posts);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts &&
            posts?.map(({ id, text }) => (
              <li key={id}>
                {text}
                <p>{/* <img src={image} alt="alt" /> */}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

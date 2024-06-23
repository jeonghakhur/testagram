'use client';

import { useState } from 'react';
import useSWR from 'swr';

type Props = {
  id: string;
};
export default function UserPost({ id: userId }: Props) {
  const [tab, setTab] = useState('saved');
  const { data: post } = useSWR(`/api/users/${userId}/${tab}`);
  console.log(post);
  return (
    <div>
      <button type="button" onClick={() => setTab('likes')}>
        UserPost
      </button>
    </div>
  );
}

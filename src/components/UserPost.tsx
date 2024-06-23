'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiBookmarkLine } from 'react-icons/ri';
import { FaShareSquare } from 'react-icons/fa';
import useSWR from 'swr';

type Props = {
  id: string;
};
export default function UserPost({ id: userId }: Props) {
  const [tab, setTab] = useState('posts');
  const { data: post } = useSWR(`/api/users/${userId}/${tab}`);
  console.log(post);
  return (
    <div className="border-t mt-6">
      <div>
        <ul className="flex text-center">
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setTab('posts')}
              className={clsx(
                'border-t-2 p-2 w-full',
                tab === 'posts' ? 'border-black' : 'border-transparent'
              )}
            >
              <FaShareSquare className="inline-block mr-1" />
              Posts
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setTab('liked')}
              className={clsx(
                tab === 'liked' && 'p-2 border-t-2 border-black w-full'
              )}
            >
              <AiOutlineHeart className="inline-block mr-1" />
              Likes
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setTab('saved')}
              className={clsx(
                tab === 'saved' && 'p-2 border-t-2 border-black w-full'
              )}
            >
              <RiBookmarkLine className="inline-block mr-1" />
              Saved
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

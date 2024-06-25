'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiBookmarkLine } from 'react-icons/ri';
import { FaShareSquare } from 'react-icons/fa';
import useSWR from 'swr';
import Image from 'next/image';
import { SimplePost } from '@/model/post';
import { signIn, useSession } from 'next-auth/react';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import PostDetail from './PostDetail';
import GridLoader from './GridLoader';

type Props = {
  id: string;
};
export default function UserPost({ id: userId }: Props) {
  const [tab, setTab] = useState('posts');
  const [openModal, setOpenModal] = useState(false);
  const { data: posts, isLoading } = useSWR<SimplePost[]>(
    `/api/users/${userId}/${tab}`
  );
  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
    return null;
  };

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
                'border-t-2 p-2 w-full',
                tab === 'liked' ? 'border-black' : 'border-transparent'
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
                'border-t-2 p-2 w-full',
                tab === 'saved' ? 'border-black' : 'border-transparent'
              )}
            >
              <RiBookmarkLine className="inline-block mr-1" />
              Saved
            </button>
          </li>
        </ul>
      </div>
      {isLoading && <GridLoader />}
      {posts && (
        <ul className="grid grid-cols-1 gap-2">
          {posts?.map((post, index) => (
            <li key={post.id} className="w-full relative aspect-square">
              <Image
                fill
                sizes="650px"
                src={post.image}
                priority={index < 6}
                alt=""
                className="object-cover"
                onClick={handleOpenPost}
              />
              {openModal && (
                <ModalPortal>
                  <Modal onClose={() => setOpenModal(false)}>
                    <PostDetail post={post} />
                  </Modal>
                </ModalPortal>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

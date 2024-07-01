'use client';

import { Comment, SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import usePosts from '@/hooks/posts';
import ActionBar from './ActionBar';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import PostDetail from './PostDetail';
import PostUser from './PostUser';

type Props = {
  post: SimplePost;
  priority: boolean;
};
export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, userName, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg shadow-md border border-gray-200 mb-6 px-4">
      <PostUser userImage={userImage} userName={userName} />
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={912}
        height={800}
        alt={`photo by ${userName}`}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className="font-bold mr-1">{userName}</span> {text}
        </p>
        {comments > 1 && (
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="font-bold my-2 text-sky-500 underline underline-offset-4"
          >
            {`View all ${comments} comments`}
          </button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <Modal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </Modal>
        </ModalPortal>
      )}
    </article>
  );
}

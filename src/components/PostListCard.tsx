'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import CommentForm from './CommentForm';
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
  const { userImage, userName, image, createdAt, likes, text, id } = post;
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
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
      <ActionBar
        id={id}
        createdAt={createdAt}
        likes={likes}
        text={text}
        userName={userName}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <Modal onClose={handleClose}>
            <PostDetail post={post} />
          </Modal>
        </ModalPortal>
      )}
    </article>
  );
}

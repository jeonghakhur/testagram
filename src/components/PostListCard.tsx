'use client';

import { SimplePost } from '@/model/post';
import { RiBookmarkLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';
import { useState } from 'react';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import PostDetail from './PostDetail';

type Props = {
  post: SimplePost;
  priority: boolean;
};
export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, userName, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <article className="rounded-lg shadow-md border border-gray-200 mb-6 px-4">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="medium" highlight />
        <span className="text-gray-900 font-bold ml-2">{userName}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={912}
        height={800}
        alt={`photo by ${userName}`}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <div className="flex gap-2 my-2 px-2 justify-end">
        <RiBookmarkLine />
        <AiOutlineHeart />
      </div>
      <ActionBar
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

'use clinet';

import { SimplePost, FullPost } from '@/model/post';
import useSWR from 'swr';
import Image from 'next/image';
import ActionBar from './ActionBar';
import PostUser from './PostUser';
import CommentForm from './CommentForm';
import Avatar from './Avatar';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { userImage, userName, image, createdAt, likes, id } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <div className="flex h-full">
      <div className="w-[60%] md:h-full relative">
        <Image
          src={image}
          alt={`user by ${userName}`}
          priority
          fill
          sizes="650px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col md:w-[40%] md:h-full px-3">
        <PostUser userImage={userImage} userName={userName} />
        <ul className="mb-auto">
          {comments &&
            comments?.map(({ image: commentImage, comment }) => (
              <li className="flex gap-2 my-2 items-center">
                <Avatar image={commentImage} size="small" highlight />
                <span className="text-sm">{comment}</span>
              </li>
            ))}
        </ul>
        <ActionBar createdAt={createdAt} likes={likes} userName={userName} />
        <CommentForm />
      </div>
    </div>
  );
}

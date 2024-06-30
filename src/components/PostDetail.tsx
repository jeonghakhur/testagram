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
  const { userImage, userName, image, id } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <div className="h-full">
      <div className="relative h-[60%]">
        <Image
          src={image}
          alt={`user by ${userName}`}
          priority
          fill
          sizes="650px"
          className="object-cover"
        />
      </div>
      <div className="px-3 flex h-[40%] flex-col justify-between">
        <PostUser userImage={userImage} userName={userName} />
        <ul className="overflow-y-auto flex-1">
          {comments &&
            comments?.map(({ image: commentImage, comment }) => (
              <li className="flex gap-2 my-2 items-center">
                <Avatar image={commentImage} size="small" highlight />
                <span className="text-sm">{comment}</span>
              </li>
            ))}
        </ul>
        <ActionBar post={post} />
        <CommentForm />
      </div>
    </div>
  );
}

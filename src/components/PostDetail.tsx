'use clinet';

import Image from 'next/image';
import useComments from '@/hooks/post';
import useMe from '@/hooks/me';
import { SimplePost } from '@/model/post';
import ActionBar from './ActionBar';
import PostUser from './PostUser';
import CommentForm from './CommentForm';
import Avatar from './Avatar';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, userName, image } = post;
  const { comments, postComment } = useComments(id);
  const { user } = useMe();
  const handlePostComment = (comment: string) => {
    if (!user) return;
    postComment({
      comment,
      id: user.id,
      image: user.image,
      userName: user.userName,
    });
  };
  return (
    <div className="h-full">
      <div className="relative h-[60%]">
        <Image
          src={image}
          alt={`user by ${userName}`}
          fill
          sizes="650px"
          className="object-cover"
        />
      </div>
      <div className="px-3 flex h-[40%] flex-col justify-between">
        <PostUser userImage={userImage} userName={userName} />
        <ul className="overflow-y-auto flex-1">
          {comments &&
            comments?.map(({ id: commentId, image: commentImage, comment }) => (
              <li className="flex gap-2 my-2 items-center" key={commentId}>
                <Avatar image={commentImage} size="small" highlight />
                <span className="text-sm">{comment}</span>
              </li>
            ))}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={handlePostComment} />
      </div>
    </div>
  );
}

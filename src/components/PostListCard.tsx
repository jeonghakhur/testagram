import { SimplePost } from '@/model/post';
import { RiBookmarkLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegSmile } from 'react-icons/fa';
import Image from 'next/image';
import { parseDate } from '@/util/date';
import Avatar from './Avatar';

type Props = {
  post: SimplePost;
};
export default function PostListCard({ post }: Props) {
  const { userImage, userName, image, createdAt, likes, text } = post;
  const likesLen = likes ? likes.length : 0;
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
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
        priority
      />
      <div className="flex gap-2 my-2 px-2 justify-end">
        <RiBookmarkLine />
        <AiOutlineHeart />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likesLen > 1 ? 'likes' : 'like'} ${likesLen}`}</p>
        <p>
          <span className="font-bold mr-1">{userName}</span> {text}
        </p>
        <p className="text-sm text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
        <form className="flex items-center border-t border-neutral-300 py-2">
          <FaRegSmile size={32} />
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full mx-2 border-none outline-nono p-3"
          />
          <button
            type="submit"
            className="font-bold text-white bg-sky-600 h-[48px] w-[96px] uppercase rounded-md"
          >
            Post
          </button>
        </form>
      </div>
    </article>
  );
}

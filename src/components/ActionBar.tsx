import { FullPost } from '@/model/post';
import { parseDate } from '@/util/date';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiBookmarkLine } from 'react-icons/ri';

type Props = Omit<FullPost, 'id' | 'userImage' | 'image' | 'comments'>;

export default function ActionBar({ userName, createdAt, likes, text }: Props) {
  const likesLen = likes ? likes.length : 0;
  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{`${likesLen > 1 ? 'likes' : 'like'} ${likesLen}`}</p>
        <div className="flex gap-2 px-2">
          <AiOutlineHeart />
          <RiBookmarkLine />
        </div>
      </div>
      {text && (
        <p>
          <span className="font-bold mr-1">{userName}</span> {text}
        </p>
      )}
      <p className="text-sm text-neutral-500 uppercase my-2">
        {parseDate(createdAt)}
      </p>
    </div>
  );
}

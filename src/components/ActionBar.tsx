import { FullPost } from '@/model/post';
import { parseDate } from '@/util/date';

type Props = Omit<FullPost, 'id' | 'userImage' | 'image' | 'comments'>;

export default function ActionBar({ userName, createdAt, likes, text }: Props) {
  const likesLen = likes ? likes.length : 0;
  return (
    <div className="px-4 py-1">
      <p className="text-sm font-bold mb-2">{`${likesLen > 1 ? 'likes' : 'like'} ${likesLen}`}</p>
      <p>
        <span className="font-bold mr-1">{userName}</span> {text}
      </p>
      <p className="text-sm text-neutral-500 uppercase my-2">
        {parseDate(createdAt)}
      </p>
    </div>
  );
}

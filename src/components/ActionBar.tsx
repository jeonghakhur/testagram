import { FullPost } from '@/model/post';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import ToggleButton from './ToggleButton';

type Props = Omit<FullPost, 'userImage' | 'image' | 'comments'>;

export default function ActionBar({
  id,
  userName,
  createdAt,
  likes,
  text,
}: Props) {
  const { data: session } = useSession();
  const likesLen = likes ? likes.length : 0;
  const user = session?.user;
  // const [liked, setLiked] = useState(user ? likes.includes(user.id) : false);
  const liked = user ? likes.includes(user.id) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { mutate } = useSWRConfig();

  const handleLike = (like: boolean) => {
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
    }).then(() => mutate('/api/posts'));
  };

  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{`${likesLen > 1 ? 'likes' : 'like'} ${likesLen}`}</p>
        <div className="flex gap-2 px-2">
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
          <ToggleButton
            toggled={bookmarked}
            onToggle={setBookmarked}
            onIcon={<BookmarkFillIcon />}
            offIcon={<BookmarkIcon />}
          />
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

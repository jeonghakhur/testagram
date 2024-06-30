import { SimplePost } from '@/model/post';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import usePosts from '@/hooks/posts';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import ToggleButton from './ToggleButton';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { userName, createdAt, likes, text } = post;
  const { data: session } = useSession();
  const likesLen = likes ? likes.length : 0;
  const user = session?.user;
  // const [liked, setLiked] = useState(user ? likes.includes(user.id) : false);
  const liked = user ? likes.includes(user.id) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.id, like);
    }
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

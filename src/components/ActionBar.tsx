import { FullPost } from '@/model/post';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import ToggleButton from './ToggleButton';

type Props = Omit<FullPost, 'id' | 'userImage' | 'image' | 'comments'>;

export default function ActionBar({ userName, createdAt, likes, text }: Props) {
  const likesLen = likes ? likes.length : 0;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{`${likesLen > 1 ? 'likes' : 'like'} ${likesLen}`}</p>
        <div className="flex gap-2 px-2">
          <ToggleButton
            toggled={liked}
            onToggle={() => setLiked(!liked)}
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

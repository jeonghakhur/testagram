import { SimplePost } from '@/model/post';
import { parseDate } from '@/util/date';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import ToggleButton from './ToggleButton';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
};

export default function ActionBar({ post, children }: Props) {
  const { id, createdAt, likes } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();
  const likesLen = likes ? likes.length : 0;
  const liked = user ? likes.includes(user.id) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.id, like);
    }
  };

  const handleBookmark = (bookmark: boolean) => {
    if (user) {
      setBookmark(user, id, bookmark);
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
            onToggle={handleBookmark}
            onIcon={<BookmarkFillIcon />}
            offIcon={<BookmarkIcon />}
          />
        </div>
      </div>
      {children}
      <p className="text-sm text-neutral-500 uppercase my-2">
        {parseDate(createdAt)}
      </p>
    </div>
  );
}

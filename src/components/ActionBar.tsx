import { SimplePost, Comment } from '@/model/post';
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
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
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

  const handleComment = (comment: string) => {
    if (user) {
      onComment({
        text: comment,
        id: user.id,
        image: user.image,
        userName: user.userName,
      });
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
      <CommentForm onPostComment={handleComment} />
    </div>
  );
}

import clsx from 'clsx';
import { FormEvent, useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t border-neutral-300 py-2 mt-auto"
    >
      <FaRegSmile size={32} />
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full mx-2 border-none outline-nono p-3"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        type="submit"
        className={clsx(
          'font-bold text-white h-[48px] w-[96px] uppercase rounded-md',
          buttonDisabled ? 'bg-gray-300' : 'bg-sky-500'
        )}
      >
        Post
      </button>
    </form>
  );
}

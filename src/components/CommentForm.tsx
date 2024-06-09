import { FaRegSmile } from 'react-icons/fa';

export default function CommentForm() {
  return (
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
  );
}

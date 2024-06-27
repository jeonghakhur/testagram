import clsx from 'clsx';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  className?: string;
};

export function HeartIcon({ className }: Props) {
  return <AiOutlineHeart className={clsx(className, 'w-5 h-5')} />;
}

export function HeartFillIcon({ className }: Props) {
  return <AiFillHeart className={clsx(className, 'w-5 h-5 fill-red-500')} />;
}

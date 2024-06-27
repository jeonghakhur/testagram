import clsx from 'clsx';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';

type Props = {
  className?: string;
};

export function BookmarkIcon({ className }: Props) {
  return <RiBookmarkLine className={clsx(className, 'w-5 h-5')} />;
}

export function BookmarkFillIcon({ className }: Props) {
  return (
    <RiBookmarkFill className={clsx(className, 'w-5 h-5 fill-neutral-700')} />
  );
}

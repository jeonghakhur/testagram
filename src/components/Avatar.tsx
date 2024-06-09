import clsx from 'clsx';

type AvatarSize = 'small' | 'medium' | 'large';
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

function getContainerSize(size: AvatarSize): string {
  if (size === 'small') {
    return 'w-9 h-9';
  }
  if (size === 'medium') {
    return 'w-11 h-11';
  }
  return 'w-[68px] h-[68px]';
}

function getImageSizeStyle(size: AvatarSize): string {
  if (size === 'small') {
    return 'w-[34px] h-[34px] p-[0.1rem]';
  }
  if (size === 'medium') {
    return 'w-[42px] h-[42px] p-[0.1rem]';
  }
  return 'w-16 h-16 p-[0.2rem]';
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
        className={clsx(
          'bg-white rounded-full object-cover',
          getImageSizeStyle(size)
        )}
      />
    </div>
  );
}

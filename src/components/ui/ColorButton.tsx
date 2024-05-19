import clsx from 'clsx';

type Props = {
  text: string;
  onClick: () => void;
  className?: string;
};

export default function ColorButton({ text, onClick, className }: Props) {
  return (
    <div
      className={clsx(
        'rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem]',
        className
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity w-full h-full"
      >
        {text}
      </button>
    </div>
  );
}

ColorButton.defaultProps = {
  className: '',
};

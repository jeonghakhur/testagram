import { CgClose } from 'react-icons/cg';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ onClose, children }: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <section
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
        console.log(event.target, event.currentTarget);
      }}
      role="button"
      tabIndex={0}
      className="fixed w-full h-full bg-slate-900 bg-opacity-90 z-50 top-0 left-0 py-10"
    >
      <div className="bg-white w-[80%] h-full mx-auto">
        <button type="button" onClick={() => onClose()} aria-label="close">
          <CgClose />
        </button>
        <div>{children}</div>
      </div>
    </section>
  );
}

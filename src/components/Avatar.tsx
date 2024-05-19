type Props = {
  image?: string | null;
};
export default function Avatar({ image }: Props) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image ?? undefined} alt="" className="rounded-full" />
    </div>
  );
}

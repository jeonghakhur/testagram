import dynamic from 'next/dynamic';

export default function GridLoader() {
  const GridLoadBox = dynamic(
    () => import('react-spinners').then((lib) => lib.GridLoader),
    { ssr: false }
  );

  return (
    <div className="flex h-[300px] items-center justify-center">
      <GridLoadBox color="red" />
    </div>
  );
}

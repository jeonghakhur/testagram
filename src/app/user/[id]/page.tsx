import UserPost from '@/components/UserPost';
import UserProfile from '@/components/UserProfile';

type Props = {
  params: { id: string };
};
export default function Userpage({ params: { id } }: Props) {
  return (
    <section>
      <UserProfile id={id} />
      <UserPost id={id} />
    </section>
  );
}

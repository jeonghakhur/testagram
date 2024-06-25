import UserPost from '@/components/UserPost';
import UserProfile from '@/components/UserProfile';
import { ProfileUser } from '@/model/user';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { cache } from 'react';

type Props = {
  params: { id: string };
};

const getUser = cache(async (id: string) => getUserForProfile(id));

export default async function Userpage({ params: { id } }: Props) {
  const user = await getUser(id);

  if (!user) {
    return <p>사용자가 없습니다.</p>;
  }

  return (
    <section>
      <UserProfile id={id} />
      <UserPost id={id} />
    </section>
  );
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const user: ProfileUser = await getUser(id);
  return {
    title: `${user?.name} (@${user?.userName})`,
  };
}

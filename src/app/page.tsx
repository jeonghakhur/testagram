import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex flex-col md:flex-row">
      <div className="md:w-[75%]">
        <FollowingBar />
        <PostList />
      </div>
      <div className="md:w-[25%] md:pl-8">
        <SideBar user={user} />
      </div>
    </section>
  );
}

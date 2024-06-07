'use client';

import { DetailUser } from '@/context/model/user';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {
  const { data, isLoading: loading } = useSWR<DetailUser>('/api/me');

  const users = data?.following && [...data.following, ...data.following];
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-md shadow-neutral-300 rounded-lg min-h-[90px] mb-4 overflow-x-scroll">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>팔로잉하는 사람이 없습니다.</p>
      )}
      {users && users.length > 0 && (
        <ul className="w-full flex gap-2">
          {users.map(({ id, image, username }) => (
            <li key={`${id}`} className="flex flex-col items-center w-20">
              <Link href={`/user/${id}`}>
                <Avatar image={image} highlight />
              </Link>
              <p className="w-full text-sm text-ellipsis overflow-hidden mt-1 text-center">
                {username}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

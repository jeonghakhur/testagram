'use client';

import { DetailUser } from '@/model/user';
import useSWR from 'swr';

type Props = {
  userId: string;
};

export default function FollowButton({ userId }: Props) {
  const { data: loggedInUser } = useSWR<DetailUser>('/api/me');

  const showButton = loggedInUser && loggedInUser.id !== userId;
  const following =
    loggedInUser && loggedInUser.followers.find((item) => item.id === userId);
  const text = following ? 'Unfollow' : 'Follow';
  return (
    <div>
      {showButton && (
        <button
          type="button"
          className="border-none rounded-md text-white bg-red-500 p-2"
        >
          {text}
        </button>
      )}
    </div>
  );
}

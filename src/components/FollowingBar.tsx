'use client';

import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useMe from '@/hooks/me';
import Carousel from 'react-multi-carousel';
import Avatar from './Avatar';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 5000, min: 464 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
  },
};

export default function FollowingBar() {
  const { user, isLoading: loading } = useMe();

  const users = user?.following;
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-md shadow-neutral-300 rounded-lg min-h-[90px] mb-4 overflow-x-scroll">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>팔로잉하는 사람이 없습니다.</p>
      )}
      {users && users.length > 0 && (
        <Carousel
          containerClass="w-full flex gap-2 z-10"
          responsive={responsive}
        >
          {users.map(({ id, image, userName }) => (
            <div key={`${id}`} className="flex flex-col items-center w-20">
              <Link href={`/user/${id}`}>
                <Avatar image={image} highlight />
              </Link>
              <p className="w-full text-sm text-ellipsis overflow-hidden mt-1 text-center">
                {userName}
              </p>
            </div>
          ))}
        </Carousel>
      )}
    </section>
  );
}

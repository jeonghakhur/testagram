'use client';

import Avatar from '@/components/Avatar';
import GridLoader from '@/components/GridLoader';
import useDebounce from '@/hooks/debounce';
import { SearchUser } from '@/model/user';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';

export default function UserSearch() {
  const [keyword, setkeyword] = useState<string>('');
  const debounceKeyword = useDebounce(keyword);
  const { data: users, isLoading } = useSWR<SearchUser[]>(
    `/api/search/${debounceKeyword}`
  );

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="px-8">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          // autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
          className="w-full text-xl p-3 outline-none border border-gray-400 rounded-md"
        />
      </form>
      {isLoading && <GridLoader />}
      {!isLoading && users?.length === 0 && <p>검색한 사용자가 없습니다.</p>}
      <ul>
        {users &&
          users?.map(({ id, image, following, followers, userName }) => (
            <li key={id}>
              <Link
                href={`/user/${id}`}
                className="flex rounded-md border border-neutral-300 my-3 p-5 items-center hover:bg-neutral-100"
              >
                <Avatar image={image} />
                <div className="ml-1">
                  <p>{userName}</p>
                  <p className="text-sm text-neutral-500">
                    Following: {following}, Followers: {followers}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

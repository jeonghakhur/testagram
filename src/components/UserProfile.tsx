import { ProfileUser } from '@/model/user';
import { getUserForProfile } from '@/service/user';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  id: string;
};
export default async function UserProfile({ id }: Props) {
  const user: ProfileUser = await getUserForProfile(id);
  const {
    id: userId,
    image,
    name,
    userName,
    following,
    followers,
    posts,
  } = user;

  const tabs = [
    { label: 'posts', data: posts },
    { label: 'following', data: following },
    { label: 'followers', data: followers },
  ];
  return (
    <div className="flex items-center">
      <Avatar image={image} size="x-large" highlight />
      <div className="ml-3">
        <h1>{userName}</h1>
        <p>{name}</p>
        <FollowButton userId={userId} />
        <ul className="flex gap-2">
          {tabs?.map(({ label, data }, index) => (
            <li key={label}>
              {index !== 0 && (
                <span className="mx-2 text-sm text-neutral-300">|</span>
              )}
              <span>{label}:</span>
              <span className="ml-1">{data}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

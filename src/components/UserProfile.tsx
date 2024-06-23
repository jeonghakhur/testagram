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
          {tabs?.map(({ label, data }) => (
            <li key={label}>
              <span>{label}</span>
              <span>{data}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { User } from '@/context/model/user';
import Avatar from './Avatar';

type Props = {
  user: User;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      {image && <Avatar image={image} />}
      <p>{name}</p>
      <p>{username}</p>
      <p>@Copyright TESTAGRAM </p>
    </>
  );
}

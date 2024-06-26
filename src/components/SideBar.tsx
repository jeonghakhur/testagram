import { AuthUser } from '@/model/user';
import Avatar from './Avatar';

type Props = {
  user: AuthUser;
};

export default function SideBar({ user: { name, userName, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{userName}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-tral-500 font-bold mt-8">
        @Copyright TESTAGRAM from HURJEONG
      </p>
    </>
  );
}

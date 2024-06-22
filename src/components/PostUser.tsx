import Avatar from './Avatar';

type Props = {
  userImage: string;
  userName: string;
};

export default function PostUser({ userImage, userName }: Props) {
  return (
    <div className="flex items-center py-4">
      <Avatar image={userImage} size="medium" highlight />
      <span className="text-gray-900 font-bold ml-2">{userName}</span>
    </div>
  );
}

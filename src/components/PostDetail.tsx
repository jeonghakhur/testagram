import { FullPost, SimplePost } from '@/model/post';
import useSWR from 'swr';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  // const comments = data?.comments;
  console.log(data);
  return (
    <div>
      <div>PostDetail</div>
    </div>
  );
}

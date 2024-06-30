import { Comment } from '@/model/post';
import useSWR from 'swr';

async function addComment(postId: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, comment }),
  }).then((res) => res.json());
}

type Props = {
  comments: Comment[];
};

export default function useComments(postId: string) {
  const { data, isLoading, error, mutate } = useSWR<Props>(
    `/api/posts/${postId}`
  );
  const comments = data?.comments;

  const postComment = (comment: Comment) => {
    if (!comments) return;
    const newComments = { comments: [...comments, comment] };

    // eslint-disable-next-line consistent-return
    return mutate(addComment(postId, comment.comment), {
      optimisticData: newComments,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { comments, isLoading, error, postComment };
}

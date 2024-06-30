import { SimplePost } from '@/model/post';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/posts');

  const setLike = (post: SimplePost, userId: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, userId]
        : post.likes.filter((item) => item !== userId),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { posts, isLoading, error, setLike };
}

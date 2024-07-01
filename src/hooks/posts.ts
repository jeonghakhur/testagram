import { Comment, SimplePost } from '@/model/post';
import useSWR from 'swr';

async function updateLike(postId: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ postId, like }),
  }).then((res) => res.json());
}

async function addComment(postId: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, comment }),
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

  const postComment = (post: SimplePost, comment: Comment) => {
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment.text), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { posts, isLoading, error, setLike, postComment };
}

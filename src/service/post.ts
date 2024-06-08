import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
  "userName": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createAt": _createdAt,
`;

export async function getFollowingPostsOf(userId: string) {
  return client
    .fetch(
      `*[_type == "post" && author->._id == "${userId}" 
      || author._ref in *[_type == "user" && _id == "${userId}"].following[]._ref]
      | order(_id desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        image: urlFor(post.image).width(800).url(),
      }))
    );
}

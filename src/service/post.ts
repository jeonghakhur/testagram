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
  "createdAt": _createdAt,
`;

export async function getFollowingPostsOf(userId: string) {
  return client
    .fetch(
      `*[_type == "post" && author->._id == "${userId}" 
      || author._ref in *[_type == "user" && _id == "${userId}"].following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        image: urlFor(post.image).width(800).url(),
      }))
    );
}

export async function getPost(id: string) {
  return client.fetch(
    `*[_type == "post" && _id == "${id}"][0]{
      comments[]{comment, "commentID": _key, "userName": author->username, "image": author->image}
    }`
  );
}

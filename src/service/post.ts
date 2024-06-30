import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
  "userName": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->_id,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt,
`;

function mapPosts(posts: SimplePost[]) {
  return posts.map((post) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image).width(800).url(),
  }));
}

export async function getFollowingPostsOf(userId: string) {
  return client
    .fetch(
      `*[_type == "post" && author->._id == "${userId}" 
      || author._ref in *[_type == "user" && _id == "${userId}"].following[]._ref]
      | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

export async function getPost(userId: string) {
  return client.fetch(
    `*[_type == "post" && _id == "${userId}"][0]{
      comments[]{comment, "id": _key, "userName": author->username, "image": author->image}
    }`
  );
}

export async function getPostOf(userId: string) {
  return client
    .fetch(
      `*[_type == "post" && author->._id == "${userId}"]
      | order(_createdAt desc){
         ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

export async function getLikedPostOf(userId: string) {
  return client
    .fetch(
      `*[_type == "post" && "${userId}" in likes[]->_id]
      | order(_createdAt desc){
         ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

export async function getSavedPostOf(userId: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && _id == "${userId}"].bookmarks[]._ref]
      | order(_createdAt desc){
         ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function disLikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: { _ref: userId, _type: 'reference' },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

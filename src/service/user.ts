import { SearchUser } from '@/model/user';
import { client } from './sanity';

type OauthUser = {
  email: string;
  id: string;
  image?: string | null;
  name: string;
  username: string;
};
export async function addUser({ id, email, name, image, username }: OauthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    image,
    name,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUser(id: string) {
  return client.fetch(
    `*[_type == "user" && _id == "${id}"]{
      ...,
      "id": _id,
      following[]->{"id": _id, "userName": username, image},
      followers[]->{"userName": username, image},
      "bookmarks": bookmarks[]->id
    }[0]`
  );
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "*${keyword}*") || (username match "*${keyword}*")`
    : '';
  return client
    .fetch(
      `
    *[_type == "user" ${query}]{
    "id": _id,
    image,
    "userName": username,
    "following": count(following),
    "followers": count(followers),
    }
    `
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(id: string) {
  return client
    .fetch(
      `
    *[_type == "user" && _id == "${id}"][0]{
    "id": _id,
    image,
    name,
    "userName": username,
    "following": count(following),
    "followers": count(followers),
    "posts": count(*[_type == "post" && author->_id == "${id}"])
    }
    `
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
    }));
}

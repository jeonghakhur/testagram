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

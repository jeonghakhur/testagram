export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'id' | 'username' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

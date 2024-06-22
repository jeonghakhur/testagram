export type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'id' | 'userName' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type ProfileUser = SimpleUser & {
  following: number;
  followers: number;
};

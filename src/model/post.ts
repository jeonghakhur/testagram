export type Comment = {
  comment: string;
  userName: string;
  image: string;
};

export type FullPost = {
  id: string;
  userName: string;
  userImage: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};

export type SimplePost = Omit<FullPost, 'comments'> & {
  comments: number;
};

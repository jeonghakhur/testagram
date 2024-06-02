import { User } from '@/context/model/user';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

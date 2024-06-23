import { AuthUser } from '@/model/user';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

import UserSearch from '@/components/UserSearch';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'User Search',
};

export default function Page() {
  return <UserSearch />;
}

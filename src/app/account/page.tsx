import { redirect } from 'next/navigation';
import { getCurrentAccount } from '@/lib/auth';
import { ComingSoonPage } from '@/views/ComingSoonPage';

export const dynamic = 'force-dynamic';

export default function AccountPage() {
  const account = getCurrentAccount();
  if (!account) redirect('/login');
  return <ComingSoonPage account={account} />;
}

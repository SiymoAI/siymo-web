import { redirect } from 'next/navigation';
import { getCurrentAccount } from '@/lib/auth';
import { AuthPage } from '@/views/AuthPage';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  if (getCurrentAccount()) redirect('/account');
  return <AuthPage />;
}

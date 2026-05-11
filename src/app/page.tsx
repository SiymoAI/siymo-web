import { redirect } from 'next/navigation';
import { getCurrentAccount } from '@/lib/auth';
import { LandingPage } from '@/views/LandingPage';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  // A signed-in visitor goes straight to their account (matches the old SPA).
  if (getCurrentAccount()) redirect('/account');
  return <LandingPage />;
}

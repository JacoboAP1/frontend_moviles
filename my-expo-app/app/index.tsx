import { Redirect } from 'expo-router';
import ClientHome from '../src/components/ClientHome';
import OfficerHome from '../src/components/OfficerHome';
import { useSession } from '../src/session/context';

export default function Home() {
  const { user, signOut } = useSession();
  const role = user?.roles?.[0];

  if (role === 'ROLE_ADMIN') {
    return <Redirect href="/admin" />;
  }

  if (role === 'ROLE_CLIENT') {
    return <ClientHome user={user!} onSignOut={signOut} />;
  }

  return <OfficerHome user={user!} onSignOut={signOut} />;
}

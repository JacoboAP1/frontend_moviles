import { Stack } from 'expo-router';
import '../global.css';
import { SessionProvider, useSession } from '../src/session/context';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Navigator />
    </SessionProvider>
  );
}

function Navigator() {
  const { user } = useSession();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#051A26' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="register" options={{ title: 'Crear cuenta' }} />
      </Stack.Protected>
    </Stack>
  );
}

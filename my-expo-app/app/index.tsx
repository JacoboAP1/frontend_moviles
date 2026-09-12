import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';
import Button from '../src/components/Button';
import { useSession } from '../src/session/context';

export default function Home() {
  const { user, signOut } = useSession();
  const role = user?.roles?.[0];

  if (role === 'ROLE_ADMIN') {
    return <Redirect href="/admin" />;
  }

  const roleLabel = role === 'ROLE_CLIENT' ? 'Cliente' : 'Officer';
  const roleBadgeColor =
    role === 'ROLE_CLIENT'
      ? 'bg-green-50 text-green-700'
      : 'bg-blue-50 text-blue-700';

  return (
    <View className="flex-1 gap-6 bg-neutral-50 p-6">
      <View className="gap-1 rounded-2xl bg-white p-5">
        <Text className="text-xl font-bold text-neutral-900">
          Hola, {user?.name}
        </Text>
        <Text className="text-neutral-500">{user?.email}</Text>
        {!!user?.telefono && (
          <Text className="text-neutral-500">{user.telefono}</Text>
        )}
        <Text
          className={`mt-2 self-start rounded-full px-3 py-1 text-xs font-semibold ${roleBadgeColor}`}>
          {roleLabel}
        </Text>
      </View>

      <View className="rounded-2xl bg-white p-5">
        <Text className="text-lg font-semibold text-neutral-900">
          {role === 'ROLE_CLIENT'
            ? 'Aquí podrás solicitar servicios profesionales'
            : 'Aquí podrás gestionar tus servicios'}
        </Text>
        <Text className="mt-1 text-neutral-500">Próximamente...</Text>
      </View>

      <View className="mt-auto gap-3">
        <Button text="Cerrar sesión" onPress={signOut} secondary />
      </View>
    </View>
  );
}

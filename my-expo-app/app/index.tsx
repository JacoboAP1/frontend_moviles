import { Text, View } from 'react-native';
import Button from '../src/components/Button';
import { useSession } from '../src/session/context';

export default function Home() {
  const { user, signOut } = useSession();

  return (
    <View className="flex-1 gap-6 bg-neutral-50 p-6">
      <View className="gap-1 rounded-2xl bg-white p-5">
        <Text className="text-xl font-bold text-neutral-900">Hola, {user?.name}</Text>
        <Text className="text-neutral-500">{user?.email}</Text>
        <Text className="mt-2 self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {user?.roles?.[0]}
        </Text>
      </View>

      <View className="gap-3">
        <Button text="Cerrar sesión" onPress={signOut} secondary />
      </View>
    </View>
  );
}

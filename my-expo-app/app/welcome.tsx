import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import Button from '../src/components/Button';

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center gap-8 bg-neutral-50 p-6">
      <View className="items-center gap-2">
        <Text className="text-3xl font-bold text-neutral-900">Oficiar</Text>
        <Text className="text-center text-neutral-500">
          Conectamos clientes con profesionales de confianza
        </Text>
      </View>

      <View className="gap-3">
        <Button
          text="Hazte Cliente"
          onPress={() => router.push('/register?role=CLIENT')}
        />
        <Button
          text="Hazte Officer"
          onPress={() => router.push('/register?role=WORKER')}
          secondary
        />
      </View>

      <Button
        text="Iniciar Sesión"
        onPress={() => router.push('/login')}
        secondary
      />
    </View>
  );
}

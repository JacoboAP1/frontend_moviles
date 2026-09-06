import { Text, View } from 'react-native';
import Button from '../src/layout/Button';
import Field from '../src/components/Field';
import { useForm } from 'react-hook-form';

type Form = { nombre: string; correo: string };

export default function Home() {
  const { control } = useForm<Form>({
    defaultValues: { nombre: '', correo: '' },
  });

  return (
    <View className="flex-1 justify-center gap-4 p-6">
      <Text className="text-2xl font-semibold text-center">Mi App</Text>

      <Field
        control={control}
        name="nombre"
        label="Nombre"
        placeholder="Tu nombre"
        rules={{ required: 'El nombre es obligatorio' }}
      />

      <Field
        control={control}
        name="correo"
        label="Correo"
        keyboardType="email-address"
        placeholder="tu@correo.com"
        rules={{
          required: 'El correo es obligatorio',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo inválido' },
        }}
      />

      <Button text="Probar botón" onPress={() => alert('Funciona!')} />
    </View>
  );
}

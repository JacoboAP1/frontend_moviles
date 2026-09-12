import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from '../src/components/Button';
import Logo from '../src/components/Logo';
import { createPerfil, deletePerfil, getPerfiles } from '../src/api/perfiles';
import { useSession } from '../src/session/context';
import type { Perfil } from '../src/types';

export default function Admin() {
  const { user, signOut } = useSession();

  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);
  const [nuevoOficio, setNuevoOficio] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const cargarPerfiles = async () => {
    try {
      const data = await getPerfiles();
      setPerfiles(data);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPerfiles();
  }, []);

  const handleCrear = async () => {
    const nombre = nuevoOficio.trim();
    if (!nombre) {
      Alert.alert('Error', 'Escribe el nombre del oficio');
      return;
    }

    setSubmitting(true);
    try {
      await createPerfil(nombre);
      setNuevoOficio('');
      await cargarPerfiles();
      Alert.alert('Listo', `"${nombre}" fue agregado al catálogo`);
    } catch (error) {
      Alert.alert('Error al crear', (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEliminar = (perfil: Perfil) => {
    Alert.alert(
      'Eliminar oficio',
      `¿Seguro que quieres eliminar "${perfil.oficio}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePerfil(perfil.id);
              await cargarPerfiles();
              Alert.alert('Listo', `"${perfil.oficio}" fue eliminado`);
            } catch (error) {
              Alert.alert('No se pudo eliminar', (error as Error).message);
            }
          },
        },
      ],
    );
  };

  return (
    <View className="flex-1 bg-oficiar-gray">
      <View className="items-center gap-1 bg-oficiar-dark px-6 pb-4 pt-12">
        <Logo size="sm" light />
        <Text className="text-lg font-bold text-white">
          Panel de Administrador
        </Text>
        <Text className="text-sm text-oficiar-blue">
          Hola, {user?.name} — gestiona el catálogo de oficios
        </Text>
      </View>

      <View className="flex-row gap-2 border-b border-neutral-200 bg-white px-6 py-3">
        <TextInput
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2"
          placeholder="Nuevo oficio (ej: Soldador)"
          value={nuevoOficio}
          onChangeText={setNuevoOficio}
          editable={!submitting}
        />
        <Pressable
          onPress={handleCrear}
          disabled={submitting}
          className="items-center justify-center rounded-lg bg-oficiar-blue-btn px-4 active:opacity-80 disabled:opacity-50">
          <Text className="font-semibold text-white">
            {submitting ? '...' : 'Agregar'}
          </Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-8" color="#3D80B7" />
      ) : (
        <FlatList
          data={perfiles}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName="px-6 py-3 gap-2"
          ListEmptyComponent={
            <Text className="py-8 text-center text-neutral-400">
              No hay oficios registrados
            </Text>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between rounded-xl bg-white px-4 py-3">
              <Text className="flex-1 text-oficiar-very-dark">{item.oficio}</Text>
              <Pressable
                onPress={() => handleEliminar(item)}
                className="rounded-lg bg-red-50 px-3 py-2 active:opacity-80">
                <Text className="text-sm font-semibold text-red-600">
                  Eliminar
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}

      <View className="px-6 pb-6">
        <Button text="Cerrar sesión" onPress={signOut} variant="secondary" />
      </View>
    </View>
  );
}

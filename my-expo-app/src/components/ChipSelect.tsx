import { Pressable, Text, View } from 'react-native';

interface Item {
  id: number;
  label: string;
}

interface Props {
  label: string;
  items: Item[];
  selected: number[];
  onChange: (ids: number[]) => void;
  error?: string;
}

export default function ChipSelect({ label, items, selected, onChange, error }: Props) {
  const toggle = (id: number) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  };

  return (
    <View className="gap-1">
      <Text className="font-semibold">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {items.map((item) => {
          const active = selected.includes(item.id);
          return (
            <Pressable
              key={item.id}
              onPress={() => toggle(item.id)}
              className={`rounded-full px-4 py-2 ${
                active ? 'bg-blue-600' : 'border border-neutral-300 bg-white'
              }`}>
              <Text className={`text-sm ${active ? 'font-semibold text-white' : 'text-neutral-700'}`}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {!!error && <Text className="text-xs text-red-600">{error}</Text>}
    </View>
  );
}

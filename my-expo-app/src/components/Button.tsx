import { Pressable, Text } from 'react-native';

type Variant = 'primary' | 'secondary' | 'yellow' | 'danger';

interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
  variant?: Variant;
  className?: string;
}

const bg: Record<Variant, string> = {
  primary: 'bg-oficiar-blue-btn',
  secondary: 'border border-neutral-300',
  yellow: 'bg-oficiar-yellow',
  danger: 'bg-red-50',
};

const fg: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-neutral-700',
  yellow: 'text-oficiar-very-dark',
  danger: 'text-red-600',
};

export default function Button({ text, onPress, disabled, secondary, variant, className }: Props) {
  const v: Variant = variant ?? (secondary ? 'secondary' : 'primary');

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center rounded-xl p-4 active:opacity-80 disabled:opacity-50 ${bg[v]} ${className ?? ''}`}>
      <Text className={`font-semibold ${fg[v]}`}>
        {text}
      </Text>
    </Pressable>
  );
}

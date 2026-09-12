import { Text, View } from 'react-native';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  light?: boolean;
}

const sizes = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-5xl',
};

export default function Logo({ size = 'md', light }: Props) {
  return (
    <View className="flex-row items-baseline">
      <Text className={`${sizes[size]} font-black ${light ? 'text-white' : 'text-oficiar-very-dark'}`}>
        Ofici
      </Text>
      <Text className={`${sizes[size]} font-black text-oficiar-blue`}>
        AR
      </Text>
    </View>
  );
}

import { View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '@/styles/colors';
import Category from '@/components/category';

export default function Index() {
  return (
    <View style={styles.container}>
          <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity activeOpacity={0.7} style={{ position: 'absolute', right: 20 }}>
          <MaterialIcons name="menu" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Category name="projetos" icon="code" isSelected={true} />
      <Category name="design" icon="brush" isSelected={false} />
      <Category name="marketing" icon="campaign" isSelected={false} />
    </View>
  );
}


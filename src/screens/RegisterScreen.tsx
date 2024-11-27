import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RegisterScreenNavigationProp } from '../types/RoutingTypes';

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  function goToLoginScreen() {
    navigation.navigate('Login');
  }
  return (
    <View className="p-12">
      <TouchableOpacity onPress={goToLoginScreen}>
        <Text>Pantalla de Register</Text>
      </TouchableOpacity>
    </View>
  );
}

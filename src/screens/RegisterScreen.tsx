import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RegisterScreenNavigationProp } from '../types/RoutingTypes';
import { useLayoutEffect } from 'react';

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  function goToLoginScreen() {
    navigation.navigate('Login');
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Registro',
      headerStyle: {
        backgroundColor: '#f39c12',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  return (
    <View className="">
      <TouchableOpacity onPress={goToLoginScreen}>
        <Text>Pantalla de Login</Text>
      </TouchableOpacity>
    </View>
  );
}

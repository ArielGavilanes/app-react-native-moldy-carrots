import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RegisterScreenNavigationProp } from '../types/RoutingTypes';
import { useLayoutEffect } from 'react';
import RegisterFormComponent from '../components/RegisterFormComponent';

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
    <View className="mt-4 flex-1 p-4">
      <RegisterFormComponent />
    </View>
  );
}

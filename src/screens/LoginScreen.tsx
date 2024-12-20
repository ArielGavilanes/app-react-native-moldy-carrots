import { View, TouchableOpacity, Text } from 'react-native';
import LoginFormComponent from '../components/LoginFormComponent';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../types/RoutingTypes';
import { useLayoutEffect } from 'react';

export default function LoginScreen() {
  const loginScreenMessage: string = 'Bienvenido!';
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const goToRegisterScreenMessage: string = 'No tienes una cuenta? Registrate';

  function goToRegisterScreen() {
    navigation.navigate('Register');
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Iniciar sesion',
      headerStyle: {
        backgroundColor: '#f39c12',
      },
      headerTintColor: '#fff',
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View className="p-4 flex-1 justify-center">
      <LoginFormComponent loginScreenMessage={loginScreenMessage} />
      <TouchableOpacity onPress={goToRegisterScreen}>
        <Text className="text-xl mt-2 font-medium">
          {goToRegisterScreenMessage}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({});

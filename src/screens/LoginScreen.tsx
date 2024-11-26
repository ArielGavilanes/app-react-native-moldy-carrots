import { View, Button, StyleSheet } from 'react-native';
import LoginFormComponent from '../components/LoginFormComponent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export default function LoginScreen() {
  const loginScreenMessage: string = 'Bienvenido al login';
  const navigation = useNavigation<LoginScreenNavigationProp>();

  function goToRegisterScreen() {
    navigation.navigate('Register');
  }
  return (
    <View className="p-4">
      <LoginFormComponent loginScreenMessage={loginScreenMessage} />
      <Button title="Ir al registro" onPress={goToRegisterScreen} />
    </View>
  );
}

const styles = StyleSheet.create({});

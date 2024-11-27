import { TouchableOpacity, View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <View className="mt-4 flex">
      <TouchableOpacity onPress={handleLogout}>
        <Text className="mt-3 text-6xl color-red-800">Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

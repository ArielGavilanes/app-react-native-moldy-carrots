import { View } from 'react-native';
import AppBar from '../components/shared/AppBar';

const ProfileScreen = () => {
  return (
    <View className="mt-6 flex">
      <AppBar></AppBar>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   info: {
//     fontSize: 16,
//     color: 'gray',
//   },
// });

export default ProfileScreen;

import { View } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import ProfileComponent from '../components/ProfileComponent';

const ProfileScreen = () => {
  const { profile } = useProfile();
  return (
    <View className="flex">
      <ProfileComponent user={profile} />
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

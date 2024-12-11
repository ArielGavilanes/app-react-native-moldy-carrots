import { View } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import ProfileComponent from '../components/ProfileComponent';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ReviewI } from '../interface/ReviewI';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { profile } = useProfile();
  const { token } = useAuth();
  const [reviewsById, setReviewsById] = useState<ReviewI[] | null>(null);
  const apiUrl: string = API_PREFIX + 'review/byUserId';
  const navigation = useNavigation();

  useEffect(() => {
    const getReviewsByUserId = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + token },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setReviewsById(result);
      } catch (error) {
        console.error('Error in get reviews by user id:', error);
      }
    };
    getReviewsByUserId(apiUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Perfil',
      headerStyle: {
        backgroundColor: '#f39c12',
      },
      headerTintColor: '#fff',
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View className="flex-1 h-full">
      <ProfileComponent user={profile} reviews={reviewsById} />
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

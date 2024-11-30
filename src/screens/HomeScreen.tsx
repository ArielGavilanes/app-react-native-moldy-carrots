import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import UserGreeting from '../components/UserGreeting';
import { useEffect } from 'react';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useProfile } from '../context/ProfileContext';

export default function HomeScreen() {
  const apiUrl: string = API_PREFIX + 'auth/profile';
  const { token } = useAuth();
  const { saveProfile } = useProfile();
  const { profile } = useProfile();
  useEffect(() => {
    const getProfile = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + token },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        saveProfile(result);
      } catch (error) {
        console.error('Error in traer profile:', error);
      }
    };
    getProfile(apiUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="mt-4 flex">
      {!profile && <Text>Loading...</Text>}
      {profile && <UserGreeting username={profile.username} />}
    </View>
  );
}

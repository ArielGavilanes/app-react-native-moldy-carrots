import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import UserGreeting from '../components/UserGreetingComponent';
import { useEffect, useState } from 'react';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useProfile } from '../context/ProfileContext';
import { MediaI } from '../../interface/MediaI';
import HomeMedias from '../components/HomeMediasComponent';

export default function HomeScreen() {
  ////
  const { logout } = useAuth();
  ////
  const apiUrl = (url: string) => API_PREFIX + url;
  const { token } = useAuth();
  const { saveProfile } = useProfile();
  const { profile } = useProfile();
  const [mediasForHome, setMediasForHome] = useState<MediaI[] | null>(null);
  useEffect(() => {
    const getProfile = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + token },
        });

        if (response.status === 401) {
          logout();
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        saveProfile(result);
      } catch (error) {
        console.error('Error in traer profile:', error);
      }
    };
    getProfile(apiUrl('auth/profile'));

    const getMediaBetweenDate = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: MediaI | MediaI[] = await response.json();

        const medias = Array.isArray(result) ? result : [result];

        setMediasForHome(medias);
      } catch (error) {
        console.error('Error in traer profile:', error);
      }
    };
    getMediaBetweenDate(apiUrl('media/between'));
  }, [logout, saveProfile, token]);

  return (
    <View className="mt-6">
      {!profile && <Text>Loading...</Text>}
      {profile && (
        <View>
          <UserGreeting username={profile.username} />
          <View className="p-2">
            <HomeMedias medias={mediasForHome} />
          </View>
        </View>
      )}
    </View>
  );
}

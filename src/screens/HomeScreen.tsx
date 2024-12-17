import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import UserGreeting from '../components/UserGreetingComponent';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useProfile } from '../context/ProfileContext';
import { MediaI } from '../interface/MediaI';
import HomeMedias from '../components/HomeMediasComponent';
import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  ////
  const { logout } = useAuth();
  ////
  const apiUrl = (url: string) => API_PREFIX + url;
  const { token } = useAuth();
  const { saveProfile } = useProfile();
  const { profile } = useProfile();
  const [mediasForHome, setMediasForHome] = useState<MediaI[] | null>(null);
  const navigation = useNavigation();

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

      const result = await response.json();
      setMediasForHome(result);
    } catch (error) {
      console.error('Error in traer profile:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfile(apiUrl('auth/profile'));

      getMediaBetweenDate(apiUrl('media/between'));
    }, []),
  );

  useEffect(() => {
    getProfile(apiUrl('auth/profile'));

    getMediaBetweenDate(apiUrl('media/between'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Inicio',
      headerStyle: {
        backgroundColor: '#f39c12',
      },
      headerTintColor: '#fff',
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View className="mt-2 h-full flex-1">
      {!profile ? (
        <ActivityIndicator size="large" color="#f39c12" />
      ) : (
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

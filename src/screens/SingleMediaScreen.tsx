import { View } from 'react-native';
import SpecificMediaScreen from '../components/SpecificMediaComponent';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useAuth } from '../context/AuthContext';
import { SingleMediaRouteProp } from '../types/RoutingTypes';
import { useEffect, useLayoutEffect, useState } from 'react';
import { MediaI } from '../../interface/MediaI';
import { useNavigation } from '@react-navigation/native';

type SingleMediaScreenProps = {
  route: SingleMediaRouteProp;
};
export default function SingleMediaScreen({ route }: SingleMediaScreenProps) {
  const { mediaId } = route.params;
  const apiUrl = API_PREFIX + 'media/' + mediaId;
  const { token } = useAuth();
  const [specificMedia, setSpecificMedia] = useState<MediaI | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const findMediaById = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + token },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setSpecificMedia(result);
      } catch (error) {
        console.error('Error in traer profile:', error);
      }
    };

    findMediaById(apiUrl);
  }, [apiUrl, token]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: specificMedia?.name,
      headerStyle: {
        backgroundColor: '#f39c12',
      },
      headerTintColor: '#fff',
    });
  }, [navigation, specificMedia]);

  return (
    <View className="flex">
      <SpecificMediaScreen media={specificMedia}></SpecificMediaScreen>
    </View>
  );
}

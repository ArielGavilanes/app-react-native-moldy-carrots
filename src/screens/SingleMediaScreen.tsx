import { View } from 'react-native';
import SpecificMediaScreen from '../components/SpecificMediaComponent';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useAuth } from '../context/AuthContext';
import { SingleMediaRouteProp } from '../types/RoutingTypes';
import { useEffect, useState } from 'react';
import { MediaI } from '../../interface/MediaI';
import AppBar from '../components/shared/AppBar';

type SingleMediaScreenProps = {
  route: SingleMediaRouteProp;
};
export default function SingleMediaScreen({ route }: SingleMediaScreenProps) {
  const { mediaId } = route.params;
  const apiUrl = API_PREFIX + 'media/' + mediaId;
  const { token } = useAuth();
  const [specificMedia, setSpecificMedia] = useState<MediaI | null>(null);

  useEffect(() => {
    const findMediaById = async (url: string) => {
      try {
        console.log('apiUrl', url);
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
  });
  return (
    <View className="mt-6 flex">
      <AppBar></AppBar>
      <SpecificMediaScreen media={specificMedia}></SpecificMediaScreen>
    </View>
  );
}

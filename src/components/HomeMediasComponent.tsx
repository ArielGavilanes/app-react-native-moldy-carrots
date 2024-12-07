import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MediaI } from '../../interface/MediaI';
import { getImageBase64 } from '../utils/getImageBase64';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/RoutingTypes';
type HomeMediasProps = {
  medias: MediaI[] | null;
};
const addedMediasMessage: string = 'Recien añadidos';

export default function HomeMedias({ medias }: HomeMediasProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View className="h-full">
      <View>
        <Text className="text-4xl mb-2 font-semibold">
          {addedMediasMessage}
        </Text>
      </View>
      <ScrollView
        className="mb-2"
        contentContainerStyle={{ paddingBottom: 85 }}
      >
        {medias?.map((media) => (
          <View
            key={media.mediaId}
            className="p-4 flex-row w-full rounded-lg mb-2"
            style={styles.container}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SingleMedia', { mediaId: media.mediaId })
              }
            >
              <View>
                <Image
                  className="overflow-hidden rounded-lg"
                  style={styles.image}
                  source={{ uri: getImageBase64(media.coverImage) }}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
            <View className="ml-4">
              <Text className="text-4xl font-bold">{media.name}</Text>
              <Text className="text-lg font-medium">
                Fecha de lanzamiento:{' '}
                <Text className="font-normal">{media.releaseDate}</Text>
              </Text>
              <Text className="text-lg font-medium">
                Genero:{' '}
                <Text className="font-normal">{media.genreId.name}</Text>
              </Text>
              <Text className="text-lg font-medium">{media.typeId.name}</Text>
              <Text className="text-lg font-medium">
                <Text className="text-3xl">{media.rating}</Text>
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 250,
  },
  container: {
    backgroundColor: '#f39c12',
  },
});

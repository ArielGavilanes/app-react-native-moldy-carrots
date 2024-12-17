import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MediaI } from '../interface/MediaI';
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
    <View className="flex">
      <View>
        <Text className="text-4xl mb-2 font-semibold">
          {addedMediasMessage}
        </Text>
      </View>
      <ScrollView
        className="mb-2 w-full"
        contentContainerStyle={{ paddingBottom: 200 }}
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
            <View className="ml-4 flex-1">
              <Text className="text-4xl font-bold text-white">
                {media.name}
              </Text>
              <Text className="text-lg font-medium text-white">
                Fecha de lanzamiento:{' '}
                <Text className="font-normal text-white">
                  {media.releaseDate}
                </Text>
              </Text>
              <Text className="text-lg font-medium text-white">
                Genero:{' '}
                <Text className="font-normal text-white">
                  {media.genreId.name}
                </Text>
              </Text>
              <Text className="text-lg font-medium text-white">
                {media.typeId.name}
              </Text>
              <Text className="text-lg font-medium text-white">
                <Text className="text-3xl text-white">
                  {media?.rating?.toFixed(2)}
                  <Text className="font-bold"> /5</Text>
                </Text>
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

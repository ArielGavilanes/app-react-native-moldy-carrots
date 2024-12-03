import { View, Text, Image, StyleSheet } from 'react-native';
import { MediaI } from '../../interface/MediaI';
import { getImageBase64 } from '../utils/getImageBase64';

type SpecificMediaScreenProps = {
  media: MediaI | null;
};
export default function SpecificMediaScreen({
  media,
}: SpecificMediaScreenProps) {
  return (
    <View>
      <View className='p-4 flex-row w-full rounded-lg mb-3"'>
        <View>
          <Image
            className="overflow-hidden rounded-lg"
            style={styles.image}
            source={{ uri: getImageBase64(media?.coverImage) }}
            resizeMode="cover"
          />
        </View>
        <View className="ml-4">
          <Text className="text-4xl font-bold">{media?.name}</Text>
          <Text className="text-lg font-medium">
            Fecha de lanzamiento:{' '}
            <Text className="font-normal">{media?.releaseDate}</Text>
          </Text>
          <Text className="text-lg font-medium">
            Genero: <Text className="font-normal">{media?.genreId.name}</Text>
          </Text>
          <Text className="text-lg font-medium">{media?.typeId.name}</Text>
          <Text className="text-lg font-medium">
            <Text className="text-3xl">{media?.rating}</Text>
          </Text>
        </View>
      </View>
      <View>
        <Text className="p-4 text-lg font-normal">{media?.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 250,
  },
});

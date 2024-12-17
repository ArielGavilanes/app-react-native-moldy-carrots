import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { MediaI } from '../interface/MediaI';
import { getImageBase64 } from '../utils/getImageBase64';
import { useNavigation } from '@react-navigation/native';
import { SearchScreenNavigationProp } from '../types/RoutingTypes';

type MediaListComponentProps = {
  medias: MediaI[] | null;
  searchQuery: string;
};

export default function MediaListComponent({
  medias,
  searchQuery,
}: MediaListComponentProps) {
  const navigation = useNavigation<SearchScreenNavigationProp>();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>
        Resultados de búsqueda:{' '}
        <Text style={styles.searchQuery}>{searchQuery}</Text>
      </Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {medias?.map((media) => (
          <View key={media.mediaId} style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SingleMedia', { mediaId: media.mediaId })
              }
            >
              <Image
                source={{ uri: getImageBase64(media.coverImage) }}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{media.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 8,
    marginLeft: 8,
  },
  searchQuery: {
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 275,
  },
  card: {
    backgroundColor: '#f39c12',
    borderRadius: 8,
    marginBottom: 16,
    width: '48%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    textAlign: 'center',
    padding: 8,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

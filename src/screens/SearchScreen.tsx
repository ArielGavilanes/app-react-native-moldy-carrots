import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MediaListComponent from '../components/MediaListComponent';
import { MediaI } from '../interface/MediaI';
import { useAuth } from '../context/AuthContext';
import { API_PREFIX } from '../utils/ApiPrefix';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [medias, setMedias] = useState<MediaI[] | null>(null);
  const [search, setSearch] = useState<boolean>(false);
  const navigation = useNavigation();
  const { token } = useAuth();
  const apiUrl: string = API_PREFIX + 'media/search?name=';

  const searchMedias = async (url: string, searchQuery: string) => {
    url = url + searchQuery;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSearch(true);
      setMedias(result);
    } catch (error) {
      console.error('Error in search medias:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Buscar',
      headerStyle: {
        backgroundColor: '#f39c12',
      },
      headerTintColor: '#fff',
      headerLeft: () => null,
    });
  }, [navigation]);
  return (
    <View>
      <View className="p-2 flex-row w-full">
        <TextInput
          className="p-3 mb-2 border rounded-md bg-white h-16 flex-1"
          placeholder="Buscar peliculas o series"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setSearch(false);
          }}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.container}
          className="ml-4 rounded-full"
          onPress={() => searchMedias(apiUrl, searchQuery)}
        >
          <Ionicons name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {searchQuery == '' && (
        <Text className="text-center">Intenta buscar algo</Text>
      )}
      {search && searchQuery != '' && (
        <View>
          <MediaListComponent medias={medias} searchQuery={searchQuery} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  input: { borderColor: '#f39c12', height: 64 },
  container: {
    width: 64,
    height: 64,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
});

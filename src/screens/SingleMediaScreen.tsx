import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SpecificMediaScreen from '../components/SpecificMediaComponent';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useAuth } from '../context/AuthContext';
import { SingleMediaRouteProp } from '../types/RoutingTypes';
import { useEffect, useLayoutEffect, useState } from 'react';
import { MediaI } from '../interface/MediaI';
import { useNavigation } from '@react-navigation/native';
import FloatingButton from '../components/shared/FloatingButton';
import Modal from 'react-native-modal';
import { Rating } from 'react-native-ratings';
import { CreateReview } from '../interface/CreateReviewI';

type SingleMediaScreenProps = {
  route: SingleMediaRouteProp;
};

export default function SingleMediaScreen({ route }: SingleMediaScreenProps) {
  const { mediaId } = route.params;
  const { token } = useAuth();
  const [specificMedia, setSpecificMedia] = useState<MediaI | null>(null);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const addReviewModalMessage: string = 'Añadir una nueva reseña';
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState<string>('');

  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
    setRating(rating);
  };

  const apiUrl = (mediaId?: number) => {
    return mediaId ? API_PREFIX + 'media/' + mediaId : API_PREFIX + 'review';
  };

  const createReview = async (url: string) => {
    try {
      const newReview: CreateReview = {
        review: description,
        score: rating,
        mediaId: mediaId,
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        setModalVisible(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        console.error('Error in traer media by id:', error);
      }
    };

    findMediaById(apiUrl(mediaId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: specificMedia?.name,
      headerStyle: {
        backgroundColor: '#f39c12',
      },
      headerTintColor: '#fff',
    });
  }, [navigation, specificMedia]);

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <View className="flex-1 h-full">
      <SpecificMediaScreen media={specificMedia}></SpecificMediaScreen>
      <FloatingButton icon="chatbubble-ellipses" onPress={openModal} />
      <Modal
        isVisible={isModalVisible}
        // onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={0.5}
      >
        <View className="bg-white rounded-lg">
          <View style={styles.container} className="flex p-4 rounded-t-lg">
            <Text className="text-3xl font-semibold text-white">
              {addReviewModalMessage}
            </Text>
          </View>
          <View className="p-4 items-start">
            <Rating
              startingValue={rating}
              imageSize={50}
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 15 }}
            />

            <TextInput
              className="w-full p-3 mb-2 border rounded-md bg-white h-64"
              placeholder="Descripcion"
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={styles.input}
              multiline={true}
            />

            <View className="flex-row mt-2">
              <TouchableOpacity
                style={styles.cancel}
                className="border p-3 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-lg font-medium">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="ml-4 p-3 rounded-md"
                style={styles.container}
                onPress={() => createReview(apiUrl())}
              >
                <Text className="text-lg font-medium text-white">Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f39c12',
  },
  input: { borderColor: '#f39c12' },
  cancel: { borderColor: '#f39c12' },
});

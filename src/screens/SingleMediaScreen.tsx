import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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
import ReviewListComponent from '../components/shared/ReviewListComponent';
import { ReviewI } from '../interface/ReviewI';

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
  const [reviewsByMediaId, setReviewsByMediaId] = useState<ReviewI[] | null>(
    null,
  );
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const reviewsMessage: string = 'Algunas reseñas de :';
  const emptyReviewsMessage: string = 'Se el primero en añadir una reseña';

  const ratingCompleted = (rating: number) => {
    setRating(rating);
  };

  const apiUrl = (mediaId?: number) => {
    return mediaId ? API_PREFIX + 'media/' + mediaId : API_PREFIX + 'review';
  };

  const validateDescription = () => {
    if (!description.trim()) {
      setDescriptionError('La descripción no puede estar vacía');
      return false;
    }
    setDescriptionError(null);
    return true;
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
        setRating(0);
        setDescription('');
        setDescriptionError(null); // Reset error state
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateReview = () => {
    if (validateDescription()) {
      createReview(apiUrl());
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

    const getReviewsByMediaId = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + token },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setReviewsByMediaId(result);
      } catch (error) {
        console.error('Error in get reviews by media id:', error);
      }
    };
    getReviewsByMediaId(API_PREFIX + 'review/byMediaId/' + mediaId);
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
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingBottom: 75 }}
      >
        <SpecificMediaScreen media={specificMedia} />
        <Text className="text-4xl p-2 font-semibold flex-1">
          {reviewsMessage}{' '}
          <Text className="font-normal">{specificMedia?.name}</Text>
        </Text>
        <View className="p-2">
          {reviewsByMediaId?.length == 0 ? (
            <Text>{emptyReviewsMessage}</Text>
          ) : reviewsByMediaId ? (
            <View className="p-2">
              <ReviewListComponent
                reviews={reviewsByMediaId?.reverse()}
                profile={true}
              />
            </View>
          ) : (
            <ActivityIndicator size="large" color="#f39c12" />
          )}
        </View>
      </ScrollView>

      <FloatingButton icon="chatbubble-ellipses" onPress={openModal} />
      <Modal
        isVisible={isModalVisible}
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
              fractions={2}
              style={{ paddingVertical: 15 }}
            />

            <TextInput
              className="w-full p-3 mb-2 border rounded-md bg-white h-64"
              placeholder="Descripción"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                setDescriptionError(null);
              }}
              style={[styles.input, descriptionError && { borderColor: 'red' }]}
              multiline={true}
            />
            {descriptionError && (
              <Text style={{ color: 'red', marginTop: 4 }}>
                {descriptionError}
              </Text>
            )}

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
                onPress={handleCreateReview}
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

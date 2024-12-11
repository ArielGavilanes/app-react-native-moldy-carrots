import { View, Image, Text, ScrollView } from 'react-native';
import { ProfileI } from '../interface/ProfileI';
import { getImageBase64 } from '../utils/getImageBase64';
import { ReviewI } from '../interface/ReviewI';

type ProfileComponentProps = {
  user: ProfileI | null;
  reviews: ReviewI[] | null;
};
export default function ProfileComponent({
  user,
  reviews,
}: ProfileComponentProps) {
  const reviewsMessage: string = 'Algunas de tu reseñas:';
  const emptyReviewsMessage: string = 'Oops! Parece que aqui no hay nada :(';

  return (
    <View className="mt-12 flex">
      <Image
        source={{ uri: getImageBase64(user?.profileImage) }}
        className="w-64 h-64 rounded-full self-center"
      />
      <Text className="text-center mt-6 text-lg font-light">
        {reviews?.length} reseñas
      </Text>
      <Text className="text-center mt-2 text-3xl font-bold">
        {user?.username}
      </Text>
      <Text className="text-center text-base font-normal">{user?.email}</Text>
      <View className="p-2 flex">
        <Text className="text-4xl mb-2 font-semibold">{reviewsMessage}</Text>
        {reviews?.length == 0 ? (
          <View className="flex justify-center items-center">
            <Text className="text-center">{emptyReviewsMessage}</Text>
          </View>
        ) : (
          <ScrollView
            className="mb-2 w-full"
            contentContainerStyle={{ paddingBottom: 250 }}
          ></ScrollView>
        )}
      </View>
    </View>
  );
}

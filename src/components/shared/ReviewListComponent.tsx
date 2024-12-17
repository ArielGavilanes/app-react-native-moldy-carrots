import { View, StyleSheet, Text } from 'react-native';
import { ReviewI } from '../../interface/ReviewI';
import { Rating } from 'react-native-ratings';

type ReviewListComponentProps = {
  reviews: ReviewI[] | null | undefined;
  profile?: boolean;
};
export default function ReviewListComponent({
  reviews,
  profile,
}: ReviewListComponentProps) {
  return (
    <View className="w-full flex-1">
      {reviews?.map((review) => (
        <View
          key={review.reviewId}
          className="mb-2 p-3 rounded-lg"
          style={styles.container}
        >
          <View pointerEvents="none" className="items-start">
            {review.score == 1 && (
              <Rating
                startingValue={1}
                imageSize={50}
                style={{ paddingVertical: 15, backgroundColor: 'white' }}
              />
            )}
            {review.score == 2 && (
              <Rating
                startingValue={2}
                imageSize={50}
                style={{ paddingVertical: 15 }}
              />
            )}
            {review.score == 3 && (
              <Rating
                startingValue={3}
                imageSize={50}
                style={{ paddingVertical: 15 }}
              />
            )}
            {review.score == 4 && (
              <Rating
                startingValue={4}
                imageSize={50}
                style={{ paddingVertical: 15 }}
              />
            )}
            {review.score == 5 && (
              <Rating
                startingValue={5}
                imageSize={50}
                style={{ paddingVertical: 15 }}
              />
            )}

            <Text className="text-white text-base font-normal">
              &quot;{review.review}&quot;
            </Text>
            {!profile && (
              <Text className="text-right mt-2 text-sm font-light italic text-gray-800">
                Reseña por {review.userId.username}
              </Text>
            )}
            {profile && (
              <Text className="text-right mt-2 text-sm font-light italic text-gray-800">
                Reseña en {review.mediaId.name}
              </Text>
            )}
          </View>
        </View>
      ))}
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

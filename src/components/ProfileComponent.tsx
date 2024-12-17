import { View, Image, Text } from 'react-native';
import { ProfileI } from '../interface/ProfileI';
import { getImageBase64 } from '../utils/getImageBase64';
import { defaultImageProfile } from '../utils/DefaulImageProfile';

type ProfileComponentProps = {
  user: ProfileI | null;
  reviewLength: number | undefined;
};
export default function ProfileComponent({
  user,
  reviewLength,
}: ProfileComponentProps) {
  return (
    <View className="mt-12 flex-1 h-full">
      {!user?.profileImage && (
        <Image
          source={defaultImageProfile}
          className="w-64 h-64 rounded-full self-center"
        />
      )}
      {user?.profileImage && (
        <Image
          source={{ uri: getImageBase64(user?.profileImage) }}
          className="w-64 h-64 rounded-full self-center"
        />
      )}
      <Text className="text-center mt-6 text-lg font-light">
        {reviewLength} reseñas
      </Text>
      <Text className="text-center mt-2 text-3xl font-bold">
        {user?.username}
      </Text>
      <Text className="text-center text-base font-normal">{user?.email}</Text>
    </View>
  );
}

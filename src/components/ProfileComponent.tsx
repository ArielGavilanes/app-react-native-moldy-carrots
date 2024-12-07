import { View, Image } from 'react-native';
import { ProfileI } from '../../interface/ProfileI';
import { getImageBase64 } from '../utils/getImageBase64';

type ProfileComponentProps = {
  user: ProfileI | null;
};
export default function ProfileComponent({ user }: ProfileComponentProps) {
  return (
    <View>
      <Image source={{ uri: getImageBase64(user?.profileImage) }} />
    </View>
  );
}

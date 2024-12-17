import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Tabs: undefined;
  SingleMedia: { mediaId: number };
};

export type HomeTabParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type SingleMediaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SingleMedia'
>;

export type SingleMediaRouteProp = RouteProp<RootStackParamList, 'SingleMedia'>;

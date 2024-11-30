import { Text } from 'react-native';

type UserGreetingProps = {
  username: string;
};
export default function UserGreeting(props: UserGreetingProps) {
  return <Text>Bienvenido!, {props.username}</Text>;
}

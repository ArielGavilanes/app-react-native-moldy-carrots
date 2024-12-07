import { Text } from 'react-native';

type UserGreetingProps = {
  username: string;
};
export default function UserGreeting(props: UserGreetingProps) {
  return (
    <Text className="text-3xl ml-1">
      Bienvenido! <Text className="font-semibold"> {props.username}</Text>
    </Text>
  );
}

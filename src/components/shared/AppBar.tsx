import { View, StyleSheet, Text } from 'react-native';

export default function AppBar() {
  return (
    <View style={styles.container} className="flex-row items-center">
      <Text className="color-white font-bold text-3xl">Moldy Carrots</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f39c12',
    width: '100%',
    height: 45,
  },
});

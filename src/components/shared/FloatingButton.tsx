import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type FloatingButtonProps = {
  icon: string;
  onPress: () => void;
};

export default function FloatingButton(props: FloatingButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Ionicons name={props.icon} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
});

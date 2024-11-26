import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Login } from '../../interface/login';

type LoginFormComponentProps = {
  loginScreenMessage: string;
};

export default function LoginFormComponent(props: LoginFormComponentProps) {
  const [formData, setFormData] = useState<Login>({
    username: '',
    password: '',
  });

  const handleChange = (field: keyof Login, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  return (
    <View>
      <Text style={styles.title} className="border-l-gray-200">
        {props.loginScreenMessage}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <TouchableOpacity style={styles.button} className="p-2">
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f39c12', // Naranja
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f39c12', // Naranja
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#f39c12', // Naranja
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { logo } from '../utils/Logo';
import { API_PREFIX } from '../utils/ApiPrefix';
import { useAuth } from '../context/AuthContext';
import { Login } from '../interface/Login';

type LoginFormComponentProps = {
  loginScreenMessage: string;
};

export default function LoginFormComponent(props: LoginFormComponentProps) {
  const { login } = useAuth();
  const loginButtonMessage: string = 'Iniciar sesion';
  const apiUrl: string = API_PREFIX + 'auth/login';

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

  const handleLogin = async (url: string, payload: Login) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        console.log('login exitoso');
      }

      const result = await response.json();
      login(result.token);
    } catch (error) {
      console.error('Error in login process:', error);
    }
  };

  return (
    <View>
      <Image source={logo} style={styles.logo} className="self-center" />

      <Text className="text-6xl font-bold text-center " style={styles.title}>
        {props.loginScreenMessage}
      </Text>

      <Text
        className="text-2xl text-center mb-3 font-semibold"
        style={styles.subtitle}
      >
        Es un gusto verte de nuevo
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <TouchableOpacity
        style={styles.button}
        className="p-2"
        onPress={() => handleLogin(apiUrl, formData)}
      >
        <Text style={styles.buttonText}>{loginButtonMessage}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#f39c12',
  },
  subtitle: {
    color: '#f39c12',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f39c12',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#f39c12',
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
  logo: {
    width: 175,
    height: 175,
  },
});

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RegisterI } from '../interface/RegisterI';
import { API_PREFIX } from '../utils/ApiPrefix';

export default function RegisterFormComponent() {
  const registerScreenMessage: string = 'Bienvenido a Moldy Carrots';
  const registerButtonMessage: string = 'Registrarse';
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const apiUrl: string = API_PREFIX + 'auth/register';

  const [registerData, setRegisterData] = useState<RegisterI>({
    username: '',
    profileImage: null,
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<
    Partial<RegisterI & { confirmPassword: string }>
  >({});

  const handleChange = (field: keyof RegisterI, value: string) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterI & { confirmPassword: string }> = {};

    if (!registerData.username)
      newErrors.username = 'El nombre de usuario es obligatorio';
    if (!registerData.name) newErrors.name = 'El nombre es obligatorio';
    if (!registerData.lastname)
      newErrors.lastname = 'El apellido es obligatorio';
    if (!registerData.email)
      newErrors.email = 'El correo electrónico es obligatorio';
    if (!registerData.password)
      newErrors.password = 'La contraseña es obligatoria';
    if (!confirmPassword)
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    else if (confirmPassword !== registerData.password)
      newErrors.confirmPassword = 'Las contraseñas no coinciden';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (url: string) => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('username', registerData.username);
      formData.append('name', registerData.name);
      formData.append('lastname', registerData.lastname);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Alert.alert('Éxito', 'Registro completado correctamente.');
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'Ocurrió un problema durante el registro.');
    }
  };

  return (
    <View>
      <Text className="text-4xl font-bold text-center" style={styles.title}>
        {registerScreenMessage}
      </Text>

      <View>
        <TextInput
          className="mt-2"
          style={styles.input}
          placeholder="Nombre de usuario"
          value={registerData.username}
          onChangeText={(text) => handleChange('username', text)}
        />
        {errors.username && <Text style={styles.error}>{errors.username}</Text>}

        <TextInput
          className="mt-2"
          style={styles.input}
          placeholder="Nombre"
          value={registerData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          className="mt-2"
          style={styles.input}
          placeholder="Apellido"
          value={registerData.lastname}
          onChangeText={(text) => handleChange('lastname', text)}
        />
        {errors.lastname && <Text style={styles.error}>{errors.lastname}</Text>}

        <TextInput
          className="mt-2"
          style={styles.input}
          placeholder="Correo electrónico"
          value={registerData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          className="mt-2"
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={registerData.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TextInput
          className="mt-2"
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
          }}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          className="p-2"
          onPress={() => handleRegister(apiUrl)}
        >
          <Text style={styles.buttonText}>{registerButtonMessage}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
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
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

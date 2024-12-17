import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RegisterI } from '../interface/RegisterI';
import * as ImagePicker from 'expo-image-picker';
import { API_PREFIX } from '../utils/ApiPrefix';

export default function RegisterFormComponent() {
  const registerScreenMessage: string = 'Bienvenido a Moldy Carrots ';
  // const registerNextStep: string = 'Siguiente';
  const registerButtonMessage: string = 'Registrarse';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [registerStep] = useState<number>(1);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<boolean>(false);
  const apiUrl: string = API_PREFIX + 'auth/register';

  const [registerData, setRegisterData] = useState<RegisterI>({
    username: '',
    profileImage: null,
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (field: keyof RegisterI, value: string) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Es necesario el permiso para esta acción');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets) {
      const image = result.assets[0];
      setRegisterData({ ...registerData, profileImage: image.uri });
      setUploadedImage(true);
    }
  };

  const handleRegister = async (url: string) => {
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
      console.log('Registro exitoso');
      Alert.alert('Éxito', 'Registro completado correctamente.');
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'Ocurrió un problema durante el registro.');
    }
  };

  return (
    <View>
      <Text className="text-4xl font-bold text-center " style={styles.title}>
        {registerScreenMessage}
      </Text>
      {registerStep === 1 && (
        <View>
          <TextInput
            className="mt-2"
            style={styles.input}
            placeholder="Nombre de usuario"
            value={registerData.username}
            onChangeText={(text) => handleChange('username', text)}
          />
          <TextInput
            className="mt-2"
            style={styles.input}
            placeholder="Nombre"
            value={registerData.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            className="mt-2"
            style={styles.input}
            placeholder="Apellido"
            value={registerData.lastname}
            onChangeText={(text) => handleChange('lastname', text)}
          />
          <TextInput
            className="mt-2"
            style={styles.input}
            placeholder="Correo electrónico"
            value={registerData.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            className="mt-2"
            style={styles.input}
            placeholder="Contraseña"
            value={registerData.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          <TextInput
            className="mt-2"
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <TouchableOpacity
            style={styles.button}
            className="p-2"
            onPress={() => handleRegister(apiUrl)}
          >
            <Text style={styles.buttonText}>{registerButtonMessage}</Text>
          </TouchableOpacity>
        </View>
      )}

      {registerStep === 2 && (
        <View>
          {registerData.profileImage ? (
            <Image
              source={{ uri: registerData.profileImage }}
              className="w-40 h-40 rounded-full mb-4 self-center"
            />
          ) : (
            <View className="w-40 h-40 rounded-full bg-gray-300 mb-4 justify-center items-center self-center text-center">
              <Text className="text-gray-500">
                Aún no ha seleccionado una imagen
              </Text>
            </View>
          )}
          {!uploadedImage ? (
            <TouchableOpacity
              style={styles.button}
              className="p-2"
              onPress={handlePickImage}
            >
              <Text style={styles.buttonText}>Subir imagen</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              className="p-2"
              onPress={() => handleRegister(apiUrl)}
            >
              <Text style={styles.buttonText}>{registerButtonMessage}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
});

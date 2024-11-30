import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import { RootStackParamList, HomeTabParamList } from './src/types/RoutingTypes';
import './global.css';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './src/screens/ProfileScreen';
import { ProfileProvider } from './src/context/ProfileContext';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator<HomeTabParamList>();

  const NavigationStack = () => {
    const { isAuthenticated } = useAuth();

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Tabs" component={Tabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  };

  const Tabs = () => (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f39c12',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        animation: 'shift',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <AuthProvider>
      <ProfileProvider>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </ProfileProvider>
    </AuthProvider>
  );
}

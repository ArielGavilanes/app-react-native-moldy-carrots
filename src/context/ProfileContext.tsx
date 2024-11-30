import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ProfileContextType } from '../types/ProfileContextType';
import { ProfileI } from '../../interface/ProfileI';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<ProfileI | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await AsyncStorage.getItem('profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    };
    loadProfile();
  }, [profile]);

  const saveProfile = async (profile: ProfileI) => {
    setProfile(profile);
    await AsyncStorage.setItem('profile', String(profile));
  };

  return (
    <ProfileContext.Provider value={{ profile, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile debe ser usado dentro de un ProfileProvider');
  }
  return context;
};

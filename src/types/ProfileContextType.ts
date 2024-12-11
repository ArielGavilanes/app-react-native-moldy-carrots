import { ProfileI } from '../interface/ProfileI';

export interface ProfileContextType {
  profile: ProfileI | null;
  saveProfile: (profile: ProfileI) => void;
}

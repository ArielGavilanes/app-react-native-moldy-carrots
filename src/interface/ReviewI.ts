import { MediaI } from './MediaI';
import { ProfileI } from './ProfileI';

export interface ReviewI {
  reviewId: number;
  review: string;
  score: number;
  userId: ProfileI;
  mediaId: MediaI;
}

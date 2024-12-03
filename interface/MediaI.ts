import { GenreCatalogueI } from './GenreCatalogueI';
import { MediaTypesCatalogueI } from './MediaTypesCatalogueI';

export interface MediaI {
  mediaId: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any;
  description: string;
  rating: number;
  releaseDate: string;
  typeId: MediaTypesCatalogueI;
  genreId: GenreCatalogueI;
}

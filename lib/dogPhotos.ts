import type { ImageSourcePropType } from 'react-native';

const bundledPhotos: Record<string, ImageSourcePropType> = {
  'luna-marche': require('@/assets/dogs/luna-marche.png'),
  'brando-marche': require('@/assets/dogs/brando-marche.png'),
};

export function dogPhotoSource(photo: string): ImageSourcePropType {
  return bundledPhotos[photo] ?? { uri: photo };
}

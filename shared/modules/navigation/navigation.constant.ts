import { NavigationConfig } from '@shared/modules/navigation/navigation.interface';
import { Navigation } from '@shared/modules/navigation/navigation.enum';

export const NAVIGATION: { [key: number]: NavigationConfig } = {
  [Navigation.DEFAULT]: {
    title: 'Label WatchTower',
  },
  [Navigation.PROCESS]: {
    title: 'Processing... Please wait',
  },
  [Navigation.MATCH_IMAGES]: {
    title: 'Output images',
  },
};

import { Injectable } from '@angular/core';
import { CoreIpc } from '@shared/enums/core.enum';
import { Navigation } from '@shared/modules/navigation/navigation.enum';
import { NavigationConfig } from '@shared/modules/navigation/navigation.interface';
import { NAVIGATION } from '@shared/modules/navigation/navigation.constant';
import { electron } from '@app/app.export';

@Injectable()
export class NavigationService {
  private current: Navigation = Navigation.DEFAULT;
  private config?: NavigationConfig;

  /**
   * Set current navigation
   * @param to
   */
  setNavigation(to: Navigation) {
    this.current = to;
    this.config = NAVIGATION[to];

    electron.ipcRenderer.send(CoreIpc.APP_UPDATE_TITLE, this.config?.title);
  }

  /**
   * Get current navigation
   */
  getNavigation(): Navigation {
    return this.current;
  }

  /**
   * Get current navigation config
   * If config is empty returns default config
   */
  getNavigationConfig(): NavigationConfig {
    return this.config || NAVIGATION[Navigation.DEFAULT];
  }
}

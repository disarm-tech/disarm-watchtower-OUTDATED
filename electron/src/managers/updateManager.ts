import { app, autoUpdater } from 'electron';
import { Development } from '@shared/environments';

class UpdateManager {
  private url = '';
  private application: Electron.App;
  private autoUpdater: Electron.AutoUpdater;

  constructor(application: Electron.App, updater: Electron.AutoUpdater) {
    this.application = application;
    this.autoUpdater = updater;
  }

  async init() {
    // if (Development()) {
    //   return;
    // }
    //
    // console.log(`[UpdateManager]: Update manager initialized`, this.url);
    //
    // this.autoUpdater.setFeedURL({ url: this.url });
    // this.autoUpdater.addListener('update-downloaded', () => {
    //   console.log(`[UpdateManager]: App update ready`);
    // });
    //
    // console.log(`[UpdateManager]: Check for updates...`);
    // this.autoUpdater.checkForUpdates();
  }

  update() {
    this.autoUpdater.quitAndInstall();
  }
}

const updateManager = new UpdateManager(app, autoUpdater);
export { updateManager };

import { WindowManager } from '@electron/window-manager';
import { app, dialog } from 'electron';
import * as ElectronStore from 'electron-store';
import * as path from 'path';
import * as url from 'url';
import { Application } from '../application';
import { updateManager } from '../managers/updateManager';
import { SelectorFolders } from '@electron/modules/selector-folders';
import { FileSystem } from '@electron/modules/file-system';
import { CoreIpc } from '@shared/enums/core.enum';
import fixPath = require('fix-path');
import { MatchImages } from '@electron/modules/match-images';

class Core {
  mainWindow?: WindowManager;
  store?: ElectronStore;

  private async onActivated() {
    if (this.mainWindow === undefined) {
      await this.createWindow();
    }
  }

  private onSecondInstance() {
    if (!this.mainWindow) {
      return false;
    }

    this.mainWindow.show();
    this.mainWindow.focus();
    return true;
  }

  private async onReady() {
    if (require('electron-squirrel-startup')) {
      return;
    }

    if (!app.requestSingleInstanceLock()) {
      core.closeApplication();
      return;
    }

    await this.createWindow();

    process.on('uncaughtException', (e) => {
      console.error('[Core]: Uncaught exception', e);
      this.mainWindow.sendMessage(CoreIpc.APP_LOG, e);
    });

    process.on('unhandledRejection', (warn) => {
      console.warn('[Core]: Unhandled Promise rejection', warn);
      this.mainWindow.sendMessage(CoreIpc.APP_LOG, warn);
    });
  }

  private createWindow(): Promise<void> {
    return new Promise(async (resolve) => {
      let LoadURI;
      if (process.argv.includes('--devWebView')) {
        LoadURI = 'http://localhost:4200';
      } else {
        LoadURI = url.format({
          pathname: path.join(__dirname, `../disarm-watchtower/index.html`),
          protocol: 'file:',
          slashes: true,
        });
      }

      this.mainWindow = new WindowManager();
      (
        await this.mainWindow.createWindow(LoadURI, {
          width: 900,
          height: 600,
          frame: false,
          resizable: false,
          maximizable: false,
          fullscreenable: false,
          transparent: true,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
          },
        })
      ).on('closed', () => {
        this.mainWindow = undefined;
      });

      resolve();
    });
  }

  run(): void {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('ready', () => this.onReady());
    app.on('activate', () => this.onActivated());
    app.on('second-instance', () => this.onSecondInstance());

    this.store = new ElectronStore();

    try {
      /**
       * fix env path for macOS
       */
      if (process.env.NODE_ENV === 'production') {
        fixPath();
      }

      /**
       * initialize app
       */
      Application.init();
      updateManager.init().catch();

      /**
       * initialize modules
       */
      FileSystem.init();
      MatchImages.init();
      SelectorFolders.init();
    } catch (error) {
      dialog.showErrorBox('Ошибка инициализации модуля', error.message);
    }
  }

  closeApplication() {
    console.log('[Core]: [closeApplication]: Quit requested');
    this.mainWindow.closeWindow();
  }
}

const core = new Core();
export { core };

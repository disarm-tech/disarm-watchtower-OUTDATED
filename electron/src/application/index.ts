import { core } from '@electron/core';
import { app, ipcMain, IpcMainEvent } from 'electron';
import { updateManager } from '@electron/managers/updateManager';
import { CoreIpc } from '@shared/enums/core.enum';

export class Application {
  public static init(): void {
    this.registerIPC();
  }

  private static registerIPC(): void {
    ipcMain.on(CoreIpc.APP_VERSION, (event) => {
      event.returnValue = app.getVersion();
    });

    ipcMain.on(CoreIpc.APP_MINIMIZE, () => {
      core.mainWindow?.minimize();
    });

    ipcMain.on(CoreIpc.APP_UPDATE, () => {
      updateManager.update();
    });

    ipcMain.on(CoreIpc.APP_QUIT, () => {
      core.closeApplication();
    });

    ipcMain.on(
      CoreIpc.APP_UPDATE_TITLE,
      (event: IpcMainEvent, title: string) => {
        const browser = core.mainWindow?.getBrowserWindow();
        if (browser) {
          browser.setTitle(title || app.getName());
        }
      }
    );
  }
}

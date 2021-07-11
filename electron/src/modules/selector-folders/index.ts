import { dialog, ipcMain, OpenDialogReturnValue } from 'electron';
import { SelectorFoldersIpc } from '@shared/modules/selector-folders/selectors-folders.enum';
import { core } from '@electron/core';
import { CoreIpc } from '@shared/enums/core.enum';

export class SelectorFolders {
  public static init(): void {
    this.registerIPC();
  }

  private static registerIPC(): void {
    ipcMain.on(SelectorFoldersIpc.SELECT_FOLDER_REQUEST, () =>
      this.selectFolders()
    );
  }

  private static selectFolders() {
    dialog
      .showOpenDialog({
        title: 'Select folders (max 50) to find duplicates',
        properties: ['openDirectory', 'multiSelections'],
      })
      .then((result: OpenDialogReturnValue) => {
        core.mainWindow?.sendMessage(
          SelectorFoldersIpc.SELECT_FOLDER_RESPONSE,
          result
        );
      })
      .catch((error) => {
        core.mainWindow.sendMessage(
          CoreIpc.APP_LOG,
          `[SelectorFolder]: [selectFolders]: Error: ${error}`
        );
      });
  }
}

import { ipcMain } from 'electron';
import { FileSystemIpc } from '@shared/modules/file-system/file-system.enum';
import { unlink } from 'fs';
import { CoreIpc } from '@shared/enums/core.enum';
import { core } from '@electron/core';

export class FileSystem {
  public static init(): void {
    this.registerIPC();
  }

  private static registerIPC(): void {
    ipcMain.on(FileSystemIpc.DELETE_FILES_REQUEST, (event, paths: string[]) => {
      this.deleteFiles(paths);
    });
  }

  private static deleteFiles(paths: string[]) {
    for (const path of paths) {
      unlink(path, (error) => {
        if (error) {
          core.mainWindow.sendMessage(
            CoreIpc.APP_LOG,
            `[FileSystem]: Unable to remove file: ${path}: ${error}`
          );
        }
      });
    }
  }
}

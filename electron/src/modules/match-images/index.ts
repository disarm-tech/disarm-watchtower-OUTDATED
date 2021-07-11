import { ipcMain, OpenDialogReturnValue } from 'electron';
import * as path from 'path';
import { core } from '@electron/core';
import { CoreIpc } from '@shared/enums/core.enum';
import { resourcesPath } from '@electron/lib/helpers';
import { catchJson, isJson } from '@shared/tools';
import { MatchImagesResponse } from '@shared/modules/match-images/match-images.interface';
import { MainProcessProgress } from '@shared/modules/main-process/main-process.interface';
import { MatchImagesIpc } from '@shared/modules/match-images/match-images.enum';
import { spawn } from 'child_process';

export class MatchImages {
  public static init(): void {
    this.registerIPC();
  }

  private static registerIPC(): void {
    ipcMain.on(
      MatchImagesIpc.MATCH_IMAGES_REQUEST,
      (event, dialog: OpenDialogReturnValue) => {
        this.matchImagesCNN(dialog);
      }
    );
  }

  private static matchImagesCNN(dialog: OpenDialogReturnValue) {
    const executableCfg = { darwin: './find_cnn', win32: 'find_cnn.exe' };
    const executable = executableCfg[process.platform];
    const cwd = path.join(resourcesPath(), 'bundles');

    if (typeof dialog.filePaths === 'undefined' || dialog.filePaths.length < 1)
      return core.mainWindow?.sendMessage(
        MatchImagesIpc.MATCH_IMAGES_RESPONSE,
        {}
      );

    this.matchImagesCnnProcess(executable, dialog.filePaths, cwd)
      .then((response) => {
        return core.mainWindow?.sendMessage(
          MatchImagesIpc.MATCH_IMAGES_RESPONSE,
          response
        );
      })
      .catch((error) => {
        core.mainWindow.sendMessage(CoreIpc.APP_LOG, error);
      });
  }

  private static matchImagesCnnProcess(
    executable: string,
    directories: string[],
    cwd: string
  ): Promise<MatchImagesResponse> {
    return new Promise((resolve, reject) => {
      let response = '';

      /**
       * progress variables
       */
      let progressComplete = false;
      const progressPattern =
        /[^0-9]*([0-9]*)\/([0-9]*)[ \[=\]>.\-ETA:]*([0-9:]*).*/gs;

      const cp = spawn(executable, [`--image_dirs=${directories.join(',')}`], {
        cwd,
      });

      cp.stderr.on('data', (data) => {
        data = data.toString();
        core.mainWindow.sendMessage(CoreIpc.APP_LOG, data);
      });

      cp.stdout.on('data', (data) => {
        data = data.toString();
        core.mainWindow.sendMessage(CoreIpc.APP_LOG, data);

        if (!progressComplete && progressPattern.test(data)) {
          const progressChunk: MainProcessProgress = {
            step: Number(data.replace(progressPattern, '$1')),
            stepsRemain: Number(data.replace(progressPattern, '$2')),
            timeRemain: data.replace(progressPattern, '$3'),
          };

          if (progressChunk.step >= progressChunk.stepsRemain) {
            progressComplete = true;
          }

          core.mainWindow.sendMessage(
            MatchImagesIpc.MATCH_IMAGES_PROGRESS,
            progressChunk
          );
        }

        response += data;
      });

      cp.on('error', (error) => {
        return reject(error);
      });

      cp.on('close', () => {
        const json = catchJson(response);

        core.mainWindow.sendMessage(CoreIpc.APP_LOG, json);

        /**
         * check if selected fragment is json data
         */
        if (isJson(json)) {
          return resolve(JSON.parse(json) as MatchImagesResponse);
        }
      });
    });
  }
}

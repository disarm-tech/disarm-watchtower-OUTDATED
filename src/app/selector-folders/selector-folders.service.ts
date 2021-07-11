import { Injectable, NgZone } from '@angular/core';
import { electron } from '@app/app.export';
import { SelectorFoldersIpc } from '@shared/modules/selector-folders/selectors-folders.enum';
import { OpenDialogReturnValue } from 'electron';

@Injectable()
export class SelectorFoldersService {
  data?: OpenDialogReturnValue;

  constructor(private zone: NgZone) {}

  public reset() {
    this.data = undefined;
  }

  public selectFolders(): Promise<OpenDialogReturnValue> {
    return new Promise((resolve) => {
      electron.ipcRenderer.send(SelectorFoldersIpc.SELECT_FOLDER_REQUEST);
      electron.ipcRenderer.once(
        SelectorFoldersIpc.SELECT_FOLDER_RESPONSE,
        (event, data: OpenDialogReturnValue) => {
          this.zone.run(() => {
            this.data = data;
            resolve(data);
          });
        }
      );
    });
  }

  public getLastSelection() {
    return this.data;
  }
}

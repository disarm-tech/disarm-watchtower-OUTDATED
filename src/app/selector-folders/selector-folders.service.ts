import { Injectable, NgZone } from '@angular/core';
import { electron } from '@app/app.export';
import { SelectorFoldersIpc } from '@shared/modules/selector-folders/selectors-folders.enum';
import { OpenDialogReturnValue } from 'electron';

@Injectable()
export class SelectorFoldersService {
  constructor(private zone: NgZone) {}

  public selectFolders(): Promise<OpenDialogReturnValue> {
    return new Promise((resolve) => {
      electron.ipcRenderer.send(SelectorFoldersIpc.SELECT_FOLDER_REQUEST);
      electron.ipcRenderer.once(
        SelectorFoldersIpc.SELECT_FOLDER_RESPONSE,
        (event, data: OpenDialogReturnValue) => {
          this.zone.run(() => {
            resolve(data);
          });
        }
      );
    });
  }
}

import { Component } from '@angular/core';
import { NavigationService } from '@app/navigation/navigation.service';
import { electron } from '@app/app.export';
import { CoreIpc } from '@shared/enums/core.enum';

@Component({
  selector: 'disarm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public navigationService: NavigationService) {}

  // settings() {
  //   this.modalityService.open(Modality.SETTINGS);
  // }

  hide() {
    electron.ipcRenderer.send(CoreIpc.APP_MINIMIZE);
  }

  exit() {
    electron.ipcRenderer.send(CoreIpc.APP_QUIT);
  }
}

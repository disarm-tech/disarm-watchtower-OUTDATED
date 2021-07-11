import { Component, OnInit } from '@angular/core';
import { electron } from '@app/app.export';
import { CoreIpc } from '@shared/enums/core.enum';

@Component({
  selector: 'disarm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    electron.ipcRenderer.on(CoreIpc.APP_LOG, (event, log) => {
      console.log(log);
    });
  }
}

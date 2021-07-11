import { Injectable, NgZone } from '@angular/core';
import { MainProcessStatus } from '@shared/modules/main-process/main-process.enum';
import { PROCESS } from '@shared/modules/main-process/main-process.constant';
import { electron } from '@app/app.export';
import { SelectorFoldersService } from '@app/selector-folders/selector-folders.service';
import { Router } from '@angular/router';
import { MatchImagesResponse } from '@shared/modules/match-images/match-images.interface';
import { MainProcessProgress } from '@shared/modules/main-process/main-process.interface';

@Injectable()
export class MainProcessService {
  status: MainProcessStatus = MainProcessStatus.INITIALIZATION;
  data: MatchImagesResponse = {};
  progressData?: MainProcessProgress;

  constructor(
    private zone: NgZone,
    private selectorFoldersService: SelectorFoldersService,
    private router: Router
  ) {}

  public reset() {
    this.status = MainProcessStatus.INITIALIZATION;
    this.data = {};
    this.progressData = undefined;
  }

  public runStep() {
    const process = PROCESS[this.status];

    if (typeof process.ipcRequest !== 'undefined') {
      electron.ipcRenderer.send(process.ipcRequest, this.params());
    }

    if (typeof process.ipcProgress !== 'undefined') {
      electron.ipcRenderer.once(
        process.ipcProgress,
        (event, chunk: MainProcessProgress) => {
          this.zone.run(() => {
            this.progress(chunk);
          });
        }
      );
    }

    if (typeof process.ipcResponse !== 'undefined') {
      electron.ipcRenderer.once(process.ipcResponse, (event, response) => {
        this.zone.run(() => {
          this.handle(response);
          this.next();
        });
      });
    }

    if (
      typeof process.ipcRequest === 'undefined' ||
      typeof process.ipcResponse === 'undefined'
    ) {
      this.next();
    }
  }

  public next() {
    if (this.status < MainProcessStatus.FINISH) {
      this.status++;
      this.runStep();
    } else {
      this.router.navigate(['/', 'match-images']).catch();
    }
  }

  private handle(response: any): void {
    switch (this.status) {
      case MainProcessStatus.MATCH_IMAGES_FROM_PATHS:
        this.data = response;
        break;
    }

    console.log(`[MainProcess]: ${PROCESS[this.status].title}`, response);
  }

  private progress(chunk: MainProcessProgress): void {
    console.log(
      `[MainProcess]: ${PROCESS[this.status].title}: Progress`,
      chunk
    );

    this.progressData = chunk;
  }

  private params(): any {
    switch (this.status) {
      case MainProcessStatus.MATCH_IMAGES_FROM_PATHS:
        return this.selectorFoldersService.data;
    }

    return {};
  }
}

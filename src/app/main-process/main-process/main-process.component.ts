import { Component, OnInit } from '@angular/core';
import { Navigation } from '@shared/modules/navigation/navigation.enum';
import { NavigationService } from '@app/navigation/navigation.service';
import { MainProcessService } from '@app/main-process/main-process.service';
import { PROCESS } from '@shared/modules/main-process/main-process.constant';
import { MainProcess } from '@shared/modules/main-process/main-process.interface';
import { MainProcessStatus } from '@shared/modules/main-process/main-process.enum';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'disarm-main-process',
  templateUrl: './main-process.component.html',
  styleUrls: ['./main-process.component.scss'],
})
export class MainProcessComponent implements OnInit {
  constructor(
    private navigationService: NavigationService,
    public mainProcessService: MainProcessService,
    private domSanitizer: DomSanitizer
  ) {}

  get progress() {
    return this.mainProcessService.progressData;
  }

  get progressFill() {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `calc(${
        (Number(this.mainProcessService.progressData?.step) /
          Number(this.mainProcessService.progressData?.stepsRemain)) *
        100
      }% - 10px)`
    );
  }

  get status() {
    return this.mainProcessService.status + 1;
  }

  get statusMax() {
    return MainProcessStatus.FINISH + 1;
  }

  get process(): MainProcess {
    return PROCESS[this.mainProcessService.status];
  }

  ngOnInit(): void {
    this.navigationService.setNavigation(Navigation.PROCESS);
    this.mainProcessService.runStep();
  }
}

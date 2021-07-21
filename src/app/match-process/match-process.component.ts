import { Component, OnInit } from '@angular/core';
import { Navigation } from '@shared/modules/navigation/navigation.enum';
import { NavigationService } from '@app/navigation/navigation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupsManagerService } from '@app/groups-manager/groups-manager.service';
import { MatchProcessService } from '@app/match-process/match-process.service';

@Component({
  selector: 'disarm-match-process',
  templateUrl: './match-process.component.html',
  styleUrls: ['./match-process.component.scss'],
})
export class MatchProcessComponent implements OnInit {
  constructor(
    private navigationService: NavigationService,
    private groupsManagerService: GroupsManagerService,
    private matchProcessService: MatchProcessService,
    private domSanitizer: DomSanitizer
  ) {}

  get progress() {
    return this.matchProcessService.progressData;
  }

  get progressFill() {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `calc(${
        (Number(this.matchProcessService.progressData?.step) /
          Number(this.matchProcessService.progressData?.stepsRemain)) *
        100
      }% - 10px)`
    );
  }

  ngOnInit(): void {
    this.navigationService.setNavigation(Navigation.PROCESS);
    this.matchProcessService.matchImages();
  }
}

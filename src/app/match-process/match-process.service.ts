import { Injectable, NgZone } from '@angular/core';
import {
  MatchImages,
  MatchImagesGroup,
  MatchImagesResponse,
} from '@shared/modules/match-images/match-images.interface';
import { electron } from '@app/app.export';
import { MatchImagesIpc } from '@shared/modules/match-images/match-images.enum';
import { MatchProcessProgress } from '@shared/modules/match-process/match-process.interface';
import { GroupsManagerService } from '@app/groups-manager/groups-manager.service';
import { Router } from '@angular/router';
import * as path from 'path';

@Injectable()
export class MatchProcessService {
  matches: MatchImages[] = [];
  progressData?: MatchProcessProgress;
  minThreshold: number | null = 0.9;

  constructor(
    private groupsManagerService: GroupsManagerService,
    private router: Router,
    private zone: NgZone
  ) {}

  matchImagesHandler(images: MatchImagesResponse): void {
    const availableGroups = this.groupsManagerService.completed();
    const matches = Object.entries(images);

    /**
     * handle matches
     * match[0] — image original
     * match[1] — images list matches
     */
    for (const match of matches) {
      let matches = 0;
      const groups: MatchImagesGroup = {};
      const groupsPush = (group: string, imagePath: string): boolean => {
        const directory = path.dirname(imagePath);
        if (typeof groups[group] === 'undefined') groups[group] = {};
        if (typeof groups[group][directory] === 'undefined')
          groups[group][directory] = [];

        groups[group][directory].push(imagePath);
        return true;
      };

      for (const group of availableGroups) {
        let groupMatch = false;

        for (const groupFolder of group.folders?.filePaths || []) {
          if (match[0].match(groupFolder) && !groupMatch) {
            groupsPush(group.label, match[0]);
            if (availableGroups.length > 1) groupMatch = true;
          }

          for (const matchImage of match[1]) {
            if (matchImage.match(groupFolder) && !groupMatch) {
              if (groupsPush(group.label, matchImage)) {
                matches++;
                if (availableGroups.length > 1) groupMatch = true;
              }
            }
          }
        }
      }

      /**
       * push result matches to this group
       */
      this.matches.push({
        showDetails: false,
        originalPath: match[0],
        matches,
        groups,
      });
    }

    this.router.navigate(['/', 'match-images']).catch();
  }

  matchImages() {
    electron.ipcRenderer.send(
      MatchImagesIpc.MATCH_IMAGES_REQUEST,
      this.groupsManagerService.completed(),
      this.minThreshold
    );

    electron.ipcRenderer.on(
      MatchImagesIpc.MATCH_IMAGES_PROGRESS,
      (event, chunk: MatchProcessProgress) => {
        this.zone.run(() => {
          this.progressData = chunk;
        });
      }
    );

    electron.ipcRenderer.once(
      MatchImagesIpc.MATCH_IMAGES_RESPONSE,
      (event, response) => {
        this.zone.run(() => {
          /**
           * unsubscribe from progress ipc
           */
          electron.ipcRenderer.removeAllListeners(
            MatchImagesIpc.MATCH_IMAGES_PROGRESS
          );

          this.matchImagesHandler(response);
        });
      }
    );
  }
}

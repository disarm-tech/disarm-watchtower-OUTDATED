import { Component, OnInit } from '@angular/core';
import { MatchImages } from '@shared/modules/match-images/match-images.interface';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { NavigationService } from '@app/navigation/navigation.service';
import { Navigation } from '@shared/modules/navigation/navigation.enum';
import { slash } from '@shared/tools';
import { Router } from '@angular/router';
import { electron } from '@app/app.export';
import { FileSystemIpc } from '@shared/modules/file-system/file-system.enum';
import { MatchProcessService } from '@app/match-process/match-process.service';

@Component({
  selector: 'disarm-match-images',
  templateUrl: './match-images.component.html',
  styleUrls: ['./match-images.component.scss'],
})
export class MatchImagesComponent implements OnInit {
  showOnlyMatches = true;

  constructor(
    private navigationService: NavigationService,
    public matchProcessService: MatchProcessService,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {}

  localImage(src: string, style = false): SafeUrl | SafeStyle {
    if (style) {
      return this.domSanitizer.bypassSecurityTrustStyle(
        `url('file://${slash(src)}')`
      );
    } else {
      return this.domSanitizer.bypassSecurityTrustUrl(`file://${slash(src)}`);
    }
  }

  toggleDetails(targetMatch: MatchImages) {
    targetMatch.showDetails = !targetMatch.showDetails;

    for (const match of this.matchProcessService.matches || [])
      if (match !== targetMatch) match.showDetails = false;
  }

  leaveImage(match: MatchImages, saveImage: string) {
    const deleteImages = [];

    for (const group of Object.entries(match.groups)) {
      for (const directory of Object.entries(group[1])) {
        const directoryKey = directory[0];
        const directoryImages = directory[1];

        for (let imageKey = 0; imageKey < directoryImages.length; imageKey++) {
          if (directoryImages[imageKey] !== saveImage) {
            match.matches--;
            deleteImages.push(directory[1][imageKey]);
            directoryImages.splice(imageKey, 1);

            if (directoryImages.length < 1) {
              match.groups[group[0]] = Object.keys(match.groups[group[0]])
                .filter((directory) => directory !== directoryKey)
                .reduce((obj: any, directory: string) => {
                  obj[directory] = match.groups[group[0]][directory];
                  return obj;
                }, {});
            }
          }
        }
      }
    }

    /**
     * send command to electron
     */
    electron.ipcRenderer?.send(
      FileSystemIpc.DELETE_FILES_REQUEST,
      deleteImages
    );
  }

  selectorFolders() {
    this.matchProcessService.matches = [];
    this.matchProcessService.progressData = undefined;
    this.router.navigate(['/']).catch();
  }

  ngOnInit(): void {
    console.log(this.matchProcessService.matches);
    this.navigationService.setNavigation(Navigation.MATCH_IMAGES);
  }
}

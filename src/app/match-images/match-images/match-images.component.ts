import { Component, OnInit } from '@angular/core';
import { MainProcessService } from '@app/main-process/main-process.service';
import { MatchImages } from '@shared/modules/match-images/match-images.interface';
import * as path from 'path';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { NavigationService } from '@app/navigation/navigation.service';
import { Navigation } from '@shared/modules/navigation/navigation.enum';
import { slash } from '@shared/tools';
import { Router } from '@angular/router';
import { SelectorFoldersService } from '@app/selector-folders/selector-folders.service';
import { electron } from '@app/app.export';
import { FileSystemIpc } from '@shared/modules/file-system/file-system.enum';

@Component({
  selector: 'disarm-match-images',
  templateUrl: './match-images.component.html',
  styleUrls: ['./match-images.component.scss'],
})
export class MatchImagesComponent implements OnInit {
  matches?: MatchImages[];

  constructor(
    private navigationService: NavigationService,
    private selectorFoldersService: SelectorFoldersService,
    private mainProcessService: MainProcessService,
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

    for (const match of this.matches || [])
      if (match !== targetMatch) match.showDetails = false;
  }

  leaveImage(match: MatchImages, saveImage: string) {
    const deleteImages = [];

    for (const directory of Object.entries(match.directories)) {
      const directoryKey = directory[0];
      const directoryImages = directory[1];

      for (let imageKey = 0; imageKey < directoryImages.length; imageKey++) {
        if (directoryImages[imageKey] !== saveImage) {
          match.matches--;
          deleteImages.push(directory[1][imageKey]);
          directoryImages.splice(imageKey, 1);

          if (directoryImages.length < 1) {
            match.directories = Object.keys(match.directories)
              .filter((key) => key !== directoryKey)
              .reduce((obj: any, key: string) => {
                obj[key] = match.directories[key];
                return obj;
              }, {});
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

  updateMatches(): void {
    const data = Object.entries(this.mainProcessService.data);
    const matches: MatchImages[] = [];

    /**
     * argv[0] — image original
     * argv[1] — images list matches
     */
    for (const argv of data) {
      const directories: { [path: string]: string[] } = {};
      let counter = 0;

      /**
       * push original
       */
      const originalDirectory = path.dirname(argv[0]);
      if (typeof directories[originalDirectory] === 'undefined')
        directories[originalDirectory] = [];

      directories[originalDirectory].push(argv[0]);

      /**
       * push matches
       */
      for (const match of argv[1]) {
        const directory = path.dirname(match);

        if (typeof directories[directory] === 'undefined')
          directories[directory] = [];

        counter++;
        directories[directory].push(match);
      }

      matches.push({
        showDetails: false,
        originalPath: argv[0],
        matches: counter,
        directories: directories,
      });
    }

    this.matches = matches;
  }

  selectorFolders() {
    this.selectorFoldersService.reset();
    this.mainProcessService.reset();
    this.router.navigate(['/']).catch();
  }

  ngOnInit(): void {
    this.updateMatches();
    this.navigationService.setNavigation(Navigation.MATCH_IMAGES);
  }
}

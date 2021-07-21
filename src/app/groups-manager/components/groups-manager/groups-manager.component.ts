import { Component, OnInit } from '@angular/core';
import { GroupsManagerService } from '@app/groups-manager/groups-manager.service';
import { GROUPS_ADD_TEMPLATE } from '@shared/modules/groups-manager/groups-manager.constant';
import { image } from '@app/app.export';
import { GroupsManagerGroup } from '@shared/modules/groups-manager/groups-manager.interface';
import { SelectorFoldersService } from '@app/selector-folders/selector-folders.service';
import * as path from 'path';
import { Router } from '@angular/router';
import { MatchProcessService } from '@app/match-process/match-process.service';

@Component({
  selector: 'disarm-groups-manager',
  templateUrl: './groups-manager.component.html',
  styleUrls: ['./groups-manager.component.scss'],
})
export class GroupsManagerComponent implements OnInit {
  image = image;
  addGroupTemplate = GROUPS_ADD_TEMPLATE;

  constructor(
    public groupsManagerService: GroupsManagerService,
    private selectorFoldersService: SelectorFoldersService,
    public matchProcessService: MatchProcessService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.groupsManagerService.all().length < 1) {
      this.newGroup();
    }
  }

  groupHaveFolders(group: GroupsManagerGroup): boolean {
    return (
      (group.folders &&
        group.folders.filePaths &&
        group.folders.filePaths.length > 0) ||
      false
    );
  }

  newGroup() {
    this.groupsManagerService.add({
      label: 'Add folders to this group',
      icon: 'icons/folder-plus.svg',
    });
  }

  deleteGroup(index: number) {
    this.groupsManagerService.remove(index);
    if (this.groupsManagerService.all().length < 1) {
      this.newGroup();
    }
  }

  runJob() {
    this.router.navigate(['/', 'process']).catch();
  }

  async selectFolders(group: GroupsManagerGroup) {
    const result = await this.selectorFoldersService.selectFolders();
    if (result && result.filePaths && result.filePaths.length > 0) {
      group.folders = result;
      group.icon = 'icons/folder-fill.svg';

      switch (result.filePaths.length) {
        case 1:
          group.label = `Only ${path.basename(result.filePaths[0])}`;
          break;

        case 2:
          group.label = `${path.basename(
            result.filePaths[0]
          )} and ${path.basename(result.filePaths[1])}`;
          break;

        default:
          group.label = `${path.basename(result.filePaths[0])} and ${
            result.filePaths.length - 1
          } more directories`;
          break;
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { GroupsManagerGroup } from '@shared/modules/groups-manager/groups-manager.interface';

@Injectable()
export class GroupsManagerService {
  private groups: GroupsManagerGroup[] = [];

  all(): GroupsManagerGroup[] {
    return this.groups;
  }

  completed(): GroupsManagerGroup[] {
    return this.groups.filter((group) => {
      return (
        group.folders &&
        group.folders.filePaths &&
        group.folders.filePaths.length > 0
      );
    });
  }

  get(index: number): GroupsManagerGroup {
    return this.groups[index];
  }

  add(group: GroupsManagerGroup): void {
    this.groups.push(group);
  }

  remove(index: number): void {
    this.groups.splice(index, 1);
  }
}

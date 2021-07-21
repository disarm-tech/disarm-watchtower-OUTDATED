import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsManagerComponent } from 'src/app/groups-manager/components/groups-manager/groups-manager.component';
import { GroupsManagerService } from '@app/groups-manager/groups-manager.service';
import { PipeModule } from '@app/core/pipe/pipe.module';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [GroupsManagerComponent],
  imports: [CommonModule, PipeModule, MatSliderModule],
  providers: [GroupsManagerService],
})
export class GroupsManagerModule {}

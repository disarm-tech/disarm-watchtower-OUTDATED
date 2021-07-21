import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchImagesComponent } from 'src/app/match-images/match-images.component';
import { PipeModule } from '@app/core/pipe/pipe.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [MatchImagesComponent],
  imports: [CommonModule, PipeModule, MatMenuModule],
})
export class MatchImagesModule {}

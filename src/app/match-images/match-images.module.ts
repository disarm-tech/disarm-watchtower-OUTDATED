import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchImagesComponent } from './match-images/match-images.component';
import { MatchImagesService } from '@app/match-images/match-images.service';
import { PipeModule } from '@app/core/pipe/pipe.module';

@NgModule({
  declarations: [MatchImagesComponent],
  imports: [CommonModule, PipeModule],
  providers: [MatchImagesService],
})
export class MatchImagesModule {}

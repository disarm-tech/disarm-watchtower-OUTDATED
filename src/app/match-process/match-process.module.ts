import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchProcessComponent } from '@app/match-process/match-process.component';
import { MatchProcessService } from '@app/match-process/match-process.service';

@NgModule({
  declarations: [MatchProcessComponent],
  imports: [CommonModule],
  providers: [MatchProcessService],
})
export class MatchProcessModule {}

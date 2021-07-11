import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProcessComponent } from './main-process/main-process.component';
import { MainProcessService } from '@app/main-process/main-process.service';

@NgModule({
  declarations: [MainProcessComponent],
  imports: [CommonModule],
  providers: [MainProcessService],
})
export class MainProcessModule {}

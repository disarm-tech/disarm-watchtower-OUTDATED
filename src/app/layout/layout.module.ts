import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { UiModule } from '@app/ui/ui.module';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [CommonModule, RouterModule, UiModule],
})
export class LayoutModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorFoldersComponent } from './selector-folders/selector-folders.component';
import { SelectorFoldersService } from '@app/selector-folders/selector-folders.service';

@NgModule({
  declarations: [SelectorFoldersComponent],
  imports: [CommonModule],
  providers: [SelectorFoldersService],
})
export class SelectorFoldersModule {}

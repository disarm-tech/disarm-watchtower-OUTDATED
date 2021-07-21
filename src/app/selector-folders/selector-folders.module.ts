import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorFoldersService } from '@app/selector-folders/selector-folders.service';

@NgModule({
  imports: [CommonModule],
  providers: [SelectorFoldersService],
})
export class SelectorFoldersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { EntriesPipe } from './pipes/entries.pipe';
import { ArrayPipe } from './pipes/array.pipe';
import { ParseIntPipe } from './pipes/parseInt.pipe';
import { ReplaceSpacePipe } from './pipes/replace.pipe';

@NgModule({
  declarations: [
    SafePipe,
    EntriesPipe,
    ArrayPipe,
    ParseIntPipe,
    ReplaceSpacePipe,
  ],
  exports: [SafePipe, EntriesPipe, ArrayPipe, ParseIntPipe, ReplaceSpacePipe],
  imports: [CommonModule],
})
export class PipeModule {}

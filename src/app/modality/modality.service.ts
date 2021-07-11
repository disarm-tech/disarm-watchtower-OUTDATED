import { Injectable } from '@angular/core';
import { Modality } from './enums/modality.enum';

@Injectable()
export class ModalityService {
  private current = Modality.CLOSED;

  open(state: Modality): void {
    this.current = state;
  }

  close(): void {
    this.current = Modality.CLOSED;
  }

  get(): Modality {
    return this.current;
  }
}

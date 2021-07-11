import { Development } from '@shared/environments';
import * as path from 'path';
import { app } from 'electron';

export function resourcesPath(): string {
  if (Development()) {
    return path.join(app.getAppPath());
  } else {
    return path.join(process.resourcesPath);
  }
}

import { ElectronService } from 'ngx-electron';

export const electron = new ElectronService();

export function image(path: string, style = true): string {
  return style
    ? `url('../../../assets/images/${path}')`
    : `/assets/images/${path}`;
}

import { OpenDialogReturnValue } from 'electron';

export interface GroupsManagerGroup {
  label: string;
  icon: string;
  folders?: OpenDialogReturnValue;
}

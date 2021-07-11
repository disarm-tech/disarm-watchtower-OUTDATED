export interface MainProcess {
  title: string;
  params?: any;
  ipcRequest?: string;
  ipcProgress?: string;
  ipcResponse?: string;
}

export interface MainProcessProgress {
  step: number;
  stepsRemain: number;
  timeRemain: string;
}

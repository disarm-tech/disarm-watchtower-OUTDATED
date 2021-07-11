import { MainProcessStatus } from '@shared/modules/main-process/main-process.enum';
import { MainProcess } from '@shared/modules/main-process/main-process.interface';
import { MatchImagesIpc } from '@shared/modules/match-images/match-images.enum';

export const PROCESS: { [key in MainProcessStatus]: MainProcess } = {
  [MainProcessStatus.INITIALIZATION]: {
    title: 'Initialization...',
  },
  [MainProcessStatus.MATCH_IMAGES_FROM_PATHS]: {
    title: 'Searching images...',
    ipcRequest: MatchImagesIpc.MATCH_IMAGES_REQUEST,
    ipcProgress: MatchImagesIpc.MATCH_IMAGES_PROGRESS,
    ipcResponse: MatchImagesIpc.MATCH_IMAGES_RESPONSE,
  },
  [MainProcessStatus.FINISH]: {
    title: 'Finish all operations',
  },
};

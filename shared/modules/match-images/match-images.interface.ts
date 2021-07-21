export interface MatchImages {
  originalPath: string;
  matches: number;
  groups: MatchImagesGroup;
  showDetails: boolean;
}

export interface MatchImagesGroup {
  [group: string]: MatchImagesDirectory;
}

export interface MatchImagesDirectory {
  [path: string]: string[];
}

export interface MatchImagesResponse {
  [key: string]: string[];
}

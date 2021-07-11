export interface MatchImages {
  originalPath: string;
  matches: number;
  directories: { [path: string]: string[] };
  showDetails: boolean;
}

export interface MatchImagesResponse {
  [key: string]: string[];
}

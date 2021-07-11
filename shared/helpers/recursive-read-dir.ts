import * as readDir from 'recursive-readdir';

export const recursiveReadDir = (dir: string): Promise<string[]> =>
  new Promise((resolve, reject) => {
    readDir(dir, (err, files): void => {
      if (err !== null) {
        return reject(err);
      }

      resolve(files);
    });
  });

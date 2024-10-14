import { createHash } from 'crypto';
import fs from 'fs';

export class Hasher {
  static calculateHash = async (path) => {
    const hash = createHash('sha256');

    try {
      const stream = fs.createReadStream(path);

      return new Promise((resolve) => {
        stream.on('data', (chunk) => {
          hash.update(chunk);
        });

        stream.on('end', () => {
          const result = hash.digest('hex');
          console.log(result);
          resolve();
        });
      });
    } catch (error) {
      console.log('Operation failed: File does not exist');
    }
  };
}

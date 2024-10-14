import { pipeline } from 'node:stream/promises';
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export class Zip {
  static compress = async (path, dest) => {
    try {
      await pipeline(
        createReadStream(path),
        createBrotliCompress(),
        createWriteStream(dest)
      );
    } catch (error) {
      console.log('Operation failed: File does not exist');
    }
  }

  static decompress = async (path, dest) => {
    try {
      await pipeline(
        createReadStream(path),
        createBrotliDecompress(),
        createWriteStream(dest)
      );
    } catch (error) {
      console.log('Operation failed: File does not exist');
    }
  }
}

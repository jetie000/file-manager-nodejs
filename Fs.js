import { promises, createReadStream, createWriteStream } from 'fs';

export class Fs {

  static handleIsFileExist = async (path, isExistError) => {
    try {
      await promises.access(path);
      if (isExistError) {
        console.log('Operation failed: File already exists');
      }
      return true;
    } catch {
      if (!isExistError) {
        console.log('Operation failed: File does not exist');
      }
      return false;
    }
  }

  static create = async (path) => {
    if (!await this.handleIsFileExist(path, true)) {
      await promises.open(path, 'w');
    }
  }

  static read = async (path) => {
    if (await this.handleIsFileExist(path, false)) {
      return new Promise((resolve) => {
        const stream = createReadStream(path, 'utf-8');
        stream.on('data', (chunk) => {
          console.log(chunk);
          resolve();
        })
      })
    }
  }

  static rename = async (oldPath, newPath) => {
    if (await this.handleIsFileExist(oldPath, false) &&
      !await this.handleIsFileExist(newPath, true)) {
      await promises.rename(oldPath, newPath);
    }
  }

  static remove = async (path) => {
    if (await this.handleIsFileExist(path, false)) {
      await promises.unlink(path);
    }
  }

  static copy = async (oldPath, newPathDir) => {
    if (await this.handleIsFileExist(oldPath, false) &&
      !await this.handleIsFileExist(`${newPathDir}/${oldPath.split('/').pop()}`, true)) {
      const inputStream = createReadStream(oldPath)
      const outputStream = createWriteStream(`${newPathDir}/${oldPath.split('/').pop()}`)

      inputStream.pipe(outputStream)

      return new Promise((resolve) => {
        outputStream.on('finish', () => {
          resolve();
        })
      })
    }
  }

  static move = async (oldPath, newPathDir) => {
    if (await this.handleIsFileExist(oldPath, false) &&
      !await this.handleIsFileExist(`${newPathDir}/${oldPath.split('/').pop()}`, true)) {
      const inputStream = createReadStream(oldPath)
      const outputStream = createWriteStream(`${newPathDir}/${oldPath.split('/').pop()}`)

      inputStream.pipe(outputStream)

      return new Promise((resolve) => {
        outputStream.on('finish', async () => {
          await promises.unlink(oldPath);
          resolve();
        })
      })
    }
  }

  static list = async () => {
    const statsFiles = [];
    const statsDirs = [];
    const data = await promises.readdir(process.cwd());
    for (const file of data) {
      const data = await promises.stat(`${process.cwd()}/${file}`);
      if (data.isDirectory()) {
        statsDirs.push({ Name: file, Type: 'directory' });
      } else {
        statsFiles.push({ Name: file, Type: 'file' });
      }
    }
    console.table([...statsDirs, ...statsFiles]);
  }
}

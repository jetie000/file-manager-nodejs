export class Nav {
  static up = () => {
    process.chdir('../');
  }

  static down = (path) => {
    try {
      process.chdir(path);
    } catch (error) {
      console.log('Operation failed: File does not exist');
    }
  }
}

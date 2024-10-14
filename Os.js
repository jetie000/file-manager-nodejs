import { EOL, arch, cpus, homedir, userInfo } from 'os'

export class Os {

  static logInfo = (arg) => console.log(Os.getInfo(arg));

  static getInfo = (arg) => {
    const argFormatted = arg.slice(2);
    switch (argFormatted) {
      case 'EOL':
        return this.getEOL();
      case 'architecture':
        return this.getArch();
      case 'cpus':
        return this.getCpus();
      case 'homedir':
        return this.getHomedir();
      case 'username':
        return this.getUsername();
      default:
        return 'Invalid command';
    }
  }

  static getEOL = () => EOL

  static getArch = () => arch()

  static getCpus = () => {
    const info = cpus();
    return `Model: ${info[0].model}\nSpeed: ${info[0].speed} MHz\nThreads: ${info.length}`
  }

  static getHomedir = () => homedir()

  static getUsername = () => userInfo().username
}

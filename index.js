import { Nav } from './Nav.js';
import { Fs } from './Fs.js';
import { Os } from './Os.js';
import { Zip } from './Zip.js';
import { Hasher } from './Hash.js';

const handleInvalidCommand = async (callback, argsCount, rightArgsNumber) => argsCount === rightArgsNumber ? await callback() : console.log('Invalid command');

const fileManager = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${process.cwd()}`);

  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  })

  process.on('SIGINT', () => process.exit());

  process.stdin.on('data', async (data) => {
    const input = data.toString().trim();
    console.log();
    const command = input.split(' ')[0];
    const args = input.split(' ').slice(1);
    switch (command) {
      case 'cd':
        await handleInvalidCommand(() => Nav.down(args[0]), args.length, 1);
        break;
      case 'up':
        await handleInvalidCommand(Nav.up, args.length, 0);
        break;
      case 'ls':
        await handleInvalidCommand(Fs.list, args.length, 0);
        break;
      case 'cat':
        await handleInvalidCommand(() => Fs.read(args[0]), args.length, 1);
        break;
      case 'add':
        await handleInvalidCommand(() => Fs.create(args[0]), args.length, 1);
        break;
      case 'rn':
        await handleInvalidCommand(() => Fs.rename(args[0], args[1]), args.length, 2);
        break;
      case 'cp':
        await handleInvalidCommand(() => Fs.copy(args[0], args[1]), args.length, 2);
        break;
      case 'mv':
        await handleInvalidCommand(() => Fs.move(args[0], args[1]), args.length, 2);
        break;
      case 'rm':
        await handleInvalidCommand(() => Fs.remove(args[0]), args.length, 1);
        break;
      case 'os':
        await handleInvalidCommand(() => Os.logInfo(args[0]), args.length, 1);
        break;
      case 'hash':
        await handleInvalidCommand(() => Hasher.calculateHash(args[0]), args.length, 1);
        break;
      case 'compress':
        await handleInvalidCommand(() => Zip.compress(args[0], args[1]), args.length, 2);
        break;
      case 'decompress':
        await handleInvalidCommand(() => Zip.decompress(args[0], args[1]), args.length, 2);
        break;
      case '.exit':
        process.exit();
      default:
        console.log('Invalid command');
        break;
    }
    console.log(`You are currently in ${process.cwd()}`);
  });
};

const username = process.env.npm_config_username;

fileManager(username);

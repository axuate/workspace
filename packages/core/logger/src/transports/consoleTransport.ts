import type { Transport } from '../entities/Transport';

export const consoleTransport: Transport = (level, message) => {
  process.stdout.write(message);
};

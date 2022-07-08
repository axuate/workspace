import type { Formatter } from '../entities/Formatter';
import type { LogLevel } from '../entities/LogLevel';

export const debugFormatter: Formatter = ({ message, context, level }): string => {
  const timestamp = new Date().toISOString();
  const logLevel = formatLevel(level);
  return `\x1b[2m${timestamp}\x1b[0m ${logLevel} \x1b[2m[${context}]\x1b[0m ${message}`;
};

function formatLevel(logLevel: LogLevel): string {
  return (
    {
      0: '\x1b[32mDEBUG',
      1: '\x1b[32m INFO',
      2: '\x1b[33m WARN',
      3: '\x1b[31mERROR'
    }[logLevel] + '\x1b[0m'
  );
}

import type { Formatter } from '../entities/Formatter';
import { LogLevel } from '../entities/LogLevel';

export const jsonFormatter: Formatter = ({ message, context, level, meta }): string => {
  return JSON.stringify({
    ...meta,
    message,
    context,
    level: LogLevel[level].toLowerCase()
  });
};

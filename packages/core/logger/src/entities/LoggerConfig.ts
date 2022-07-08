import type { Formatter } from './Formatter';
import type { Transport } from './Transport';
import type { LogLevel } from './LogLevel';

export type LoggerConfig = {
  level: LogLevel;
  formatter: Formatter;
  transports: Transport[];
  context?: string;
  meta?: Record<string, unknown>;
};

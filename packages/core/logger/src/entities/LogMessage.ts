import type { LogLevel } from './LogLevel';

export type LogMessage = {
  message: string;
  level: LogLevel;
  meta: Record<string, unknown>;
  context?: string;
};

import type { LogLevel } from './LogLevel';

export type Transport = (level: LogLevel, message: string) => void;

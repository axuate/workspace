import type { LogMessage } from './LogMessage';

export type Formatter = (message: LogMessage) => string;

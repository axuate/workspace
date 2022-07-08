import type { LoggerConfig } from './entities/LoggerConfig';
import { LogLevel } from './entities/LogLevel';

export class Logger {
  private readonly config: LoggerConfig;

  public constructor(config: LoggerConfig) {
    this.config = config;
  }

  public child(config: Partial<LoggerConfig>): Logger {
    return new Logger({
      ...this.config,
      ...config
    });
  }

  private log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
    if (level >= this.config.level) {
      const formattedMessage = this.config.formatter({
        message,
        level,
        context: this.config.context,
        meta: { ...meta, ...this.config.meta }
      });
      this.config.transports.forEach((transport) => transport(level, formattedMessage));
    }
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, meta);
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, meta);
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, meta);
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, meta);
  }
}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

/**
 * Logging levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
  context?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly isBrowser: boolean;
  private readonly minLevel: LogLevel;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only log in development mode or browser
    this.minLevel = environment.production ? LogLevel.ERROR : LogLevel.DEBUG;
  }

  /**
   * Log debug messages (development only)
   */
  debug(message: string, data?: any, context?: string): void {
    this.log(LogLevel.DEBUG, message, data, context);
  }

  /**
   * Log info messages
   */
  info(message: string, data?: any, context?: string): void {
    this.log(LogLevel.INFO, message, data, context);
  }

  /**
   * Log warning messages
   */
  warn(message: string, data?: any, context?: string): void {
    this.log(LogLevel.WARN, message, data, context);
  }

  /**
   * Log error messages
   */
  error(message: string, error?: any, context?: string): void {
    this.log(LogLevel.ERROR, message, error, context);
  }

  /**
   * Internal logging method
   */
  private log(level: LogLevel, message: string, data?: any, context?: string): void {
    if (!this.isBrowser || level < this.minLevel) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      context,
    };

    // Format log message
    const prefix = context ? `[${context}]` : '';
    const timestamp = entry.timestamp.toISOString();
    const logMessage = `${timestamp} ${prefix} ${message}`;

    // Log to console with appropriate method
    switch (level) {
      case LogLevel.DEBUG:
        if (data) {
          console.debug(logMessage, data);
        } else {
          console.debug(logMessage);
        }
        break;
      case LogLevel.INFO:
        if (data) {
          console.info(logMessage, data);
        } else {
          console.info(logMessage);
        }
        break;
      case LogLevel.WARN:
        if (data) {
          console.warn(logMessage, data);
        } else {
          console.warn(logMessage);
        }
        break;
      case LogLevel.ERROR:
        if (data) {
          console.error(logMessage, data);
        } else {
          console.error(logMessage);
        }
        break;
    }

    // In production, you could send logs to an external service
    // e.g., Sentry, LogRocket, or your own logging backend
    if (environment.production && level >= LogLevel.ERROR) {
      // TODO: Integrate with error tracking service
      // this.sendToErrorTracking(entry);
    }
  }
}


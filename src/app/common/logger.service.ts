import { Injectable } from '@angular/core';
enum LogSeverity {
  debug = 0,
  info = 1,
  log = 2,
  warn = 3,
  error = 4
}
const LOG_SEVERITY: LogSeverity = LogSeverity.log; // TODO: should eventually be configurable

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  error(...args: any[]): void {
    if (LOG_SEVERITY > LogSeverity.error) return;
    const [message, ...otherArgs] = args;
    console.error(message, ...otherArgs);
  }
  warn(...args: any[]): void {
    if (LOG_SEVERITY > LogSeverity.warn) return;
    const [message, ...otherArgs] = args;
    console.warn(message, ...otherArgs);
  }
  log(...args: any[]): void {
    if (LOG_SEVERITY > LogSeverity.log) return;
    const [message, ...otherArgs] = args;
    console.log(message, ...otherArgs);
  }
  info(...args: any[]): void {
    if (LOG_SEVERITY > LogSeverity.info) return;
    const [message, ...otherArgs] = args;
    console.info(message, ...otherArgs);
  }
  debug(...args: any[]): void {
    if (LOG_SEVERITY > LogSeverity.debug) return;
    const [message, ...otherArgs] = args;
    console.debug(message, ...otherArgs);
  }
}

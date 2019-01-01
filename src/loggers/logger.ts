/**
 * abstract base class for loggers
 */
export abstract class Logger {
  /**
   * log information
   * @param message the message to log
   */
  public info(message: string): void { /* do nothing by default */ }

  /**
   * log an error
   * @param message the message to log
   */
  public error(message: string): void { /* do nothing by default */ }
}

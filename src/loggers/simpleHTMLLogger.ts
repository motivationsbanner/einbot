import { Logger } from "./logger";

/**
 * log information to a HTML element
 */
export class SimpleHTMLLogger extends Logger {
  /**
   * constructor
   * @param element the container for the log messages
   */
  constructor(private element: HTMLElement) {
    super();
  }

  public info(message: string): void {
    this.element.appendChild(document.createTextNode(message + "\n"));
  }
}

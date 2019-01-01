import { Logger } from "./logger";

/**
 * log information to a HTML element
 */
export class SimpleHTMLLogger extends Logger {
  private muted: boolean = false;

  /**
   * constructor
   * @param element the container for the log messages
   */
  constructor(private element: HTMLElement) {
    super();
  }

  public mute(): void {
    this.muted = true;
  }

  public unmute(): void {
    this.muted = false;
  }

  public info(message: string): void {
    if (!this.muted) {
      this.element.appendChild(document.createTextNode(message + "\n"));
      this.element.scrollTop = this.element.scrollHeight;
    }
  }
}

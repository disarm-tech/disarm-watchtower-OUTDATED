import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

class WindowManager {
  protected browserWindow?: BrowserWindow;

  /**
   * Get browser window
   */
  public getBrowserWindow(): BrowserWindow | undefined {
    return this.browserWindow;
  }

  /**
   * Send message to the renderer
   *
   * @param {string} channel - channel of the message
   * @param {any} object - any data of the message
   */
  public sendMessage(channel: string, object: any = null): void {
    this.browserWindow.webContents.send(channel, object);
  }

  /**
   * Create new window
   *
   * @param {string} url - url to load in the window
   * @param {BrowserWindowConstructorOptions} options - window options
   */
  public createWindow(
    url: string,
    options?: BrowserWindowConstructorOptions
  ): Promise<BrowserWindow> {
    if (this.browserWindow) {
      return Promise.resolve(this.browserWindow);
    }

    return new Promise(async (resolve) => {
      this.browserWindow = new BrowserWindow(options);
      await this.browserWindow.loadURL(url);

      this.browserWindow.on('closed', () => {
        this.browserWindow = undefined;
      });

      this.browserWindow.webContents.openDevTools({ mode: 'detach' });
      resolve(this.browserWindow);
    });
  }

  /**
   * Focus on window
   */
  public focus(): void {
    this.browserWindow?.focus();
  }

  /**
   * Minimize the window
   */
  public minimize(): void {
    BrowserWindow.fromId(this.browserWindow.id).minimize();
  }

  /**
   * Hide the window
   */
  public hide(): void {
    this.browserWindow?.hide();
  }

  /**
   * Show up the window
   */
  public show(): void {
    this.browserWindow?.restore();
  }

  /**
   * Check is window minimized
   */
  public isMinimized(): boolean {
    return this.browserWindow?.isMinimized() || false;
  }

  /**
   * Restore the window if it was hidden
   */
  public restore(): void {
    this.browserWindow?.restore();
  }

  /**
   * Request window close
   */
  public closeWindow(): void {
    this.browserWindow?.close();
  }
}

export { WindowManager };

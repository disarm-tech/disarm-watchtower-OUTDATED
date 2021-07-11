class AppState {
  private mainProcessAvailable = false;

  /**
   * Set main process status
   *
   * @return {boolean}
   *
   * @param {boolean} status
   */
  public setMainProcess(status: boolean): void {
    this.mainProcessAvailable = status;
  }

  /**
   * Get main process status
   *
   * @return {boolean}
   */
  public getMainProcess(): boolean {
    return this.mainProcessAvailable;
  }
}

const appState = new AppState();
export { appState };

import { BrowserWindow } from 'electron';

import { getRendererHtmlUrl } from '../lib/paths';

class MainWindow {
  private window: BrowserWindow;

  constructor() {
    this.window = new BrowserWindow({
      width: 500,
      height: 300,
      show: false
    });
    this.window.loadURL(getRendererHtmlUrl());
  }

  public open() {
    this.window.show();
  }

  public close() {
    this.window.hide();
  }
}

export default MainWindow;

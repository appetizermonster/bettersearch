import { app } from 'electron';

import MainWindow from './MainWindow';

app.on('ready', () => {
  const mainWindow = new MainWindow();
  mainWindow.open();
});

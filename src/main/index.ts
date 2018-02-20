import { app } from 'electron';

import MainWindow from './MainWindow';
import WorkerProxy from './WorkerProxy';

app.on('ready', async () => {
  const mainWindow = new MainWindow();
  mainWindow.open();

  const workerProxy = new WorkerProxy();
  await workerProxy.start();
});

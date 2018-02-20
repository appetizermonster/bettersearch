import ProcessBridge from './ProcessBridge';

const processBridge = new ProcessBridge(process);

(async () => {
  await processBridge.initialize();
  console.log('worker: connected');
})().catch(console.error);

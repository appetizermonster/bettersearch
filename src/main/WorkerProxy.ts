import cp, { ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import { FromEventObservable } from 'rxjs/observable/FromEventObservable';
import { filter, take, timeout } from 'rxjs/operators';

import { getWorkerScriptPath } from '../lib/paths';
import { ProcessMessage, WorkerMessage } from '../lib/types';

class WorkerProxy extends EventEmitter {
  private proc: ChildProcess;

  public async start() {
    const workerScriptPath = getWorkerScriptPath();
    this.proc = cp.fork(workerScriptPath);

    const helloMsg: ProcessMessage = {
      type: 'hello'
    };
    const helloSuccess = this.proc.send(helloMsg);
    if (!helloSuccess) {
      throw new Error('Sending hello message failed');
    }

    await FromEventObservable.create(this.proc, 'message')
      .pipe(filter((msg: ProcessMessage) => msg.type === 'reply-hello'), take(1), timeout(15000))
      .toPromise();
    console.log('connected to worker!');
  }

  public sendMessage(message: WorkerMessage) {
    this.ensureProcess();
    const procMsg: ProcessMessage = {
      type: 'msg',
      payload: message
    };
    const success = this.proc.send(procMsg);
    if (!success) {
      throw new Error('Sending message failed');
    }
  }

  private ensureProcess() {
    if (!this.proc || !this.proc.connected) {
      throw new Error("Process isn't connected");
    }
  }
}

export default WorkerProxy;

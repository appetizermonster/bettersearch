import { FromEventObservable } from 'rxjs/observable/FromEventObservable';
import { filter, take, timeout } from 'rxjs/operators';

import { ProcessMessage } from '../lib/types';

class ProcessBridge {
  private proc: NodeJS.Process;

  constructor(proc: NodeJS.Process) {
    this.proc = proc;
  }

  public async initialize(): Promise<void> {
    await FromEventObservable.create(this.proc, 'message')
      .pipe(filter((msg: ProcessMessage) => msg.type === 'hello'), take(1), timeout(15000))
      .toPromise();

    const replyMsg: ProcessMessage = { type: 'reply-hello' };
    this.proc.send(replyMsg);
  }
}

export default ProcessBridge;

export interface WorkerMessage {
  type: string;
}

export interface ProcessMessage {
  type: 'msg' | 'hello' | 'reply-hello';
  payload?: any;
}

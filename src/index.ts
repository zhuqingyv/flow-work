import TaskRunner from "./TaskRunner";
import FlowCore from "./FlowCore";
import { InterceptType } from "./types";

interface InterfaceOptions {
  'register'?:Function;
  'run'?:Function;
  'error'?:Function;
  'call'?:Function;
};

class Flow extends FlowCore {
  [x: string]: any;
  firstRunner:TaskRunner | null = null;
  currentRunner:TaskRunner | null = null;
  runnerMap = new Map();
  interceptOptions:InterfaceOptions | null = null;

  constructor(name:string) {
    super();
    this.name = name;
  };

  tap = (name:string) => {
    const runner = new TaskRunner(name, this);
    this.runnerMap.set(name, runner);

    if (!this.firstRunner) this.firstRunner = runner;
    if (!this.currentRunner) this.currentRunner = runner;

    this.update(runner);
    this.dispatch(InterceptType.REGISTER, { runner });
    return {
      run: runner.run,
      tap: this.tap
    }
  };

  intercept = (options:any = null) => {
    this.interceptOptions = options;
  };

  call = (data:any, finished:Function) => {
    const { firstRunner } = this;
    if (firstRunner) {
      this.dispatch(InterceptType.CALL, { flow: this, data });
      firstRunner.start(data, finished);
    };
  };

  dispatch = (eventName:InterceptType, event:any) => {
    if (!this.interceptOptions) return;
    const callback = this.interceptOptions[eventName];
    if (callback && callback instanceof Function) {
      callback({ ...event });
    };
  };

};

export default Flow;
import FlowCore from "./FlowCore";
import Flow from "./";
import { TaskType } from "./types";

class TaskRunner {
  name:string | null = null;
  flow:FlowCore | null = null;
  next:TaskRunner | null = null;
  pre:TaskRunner | null = null;

  taskList = new Map();
  first:TaskType | null = null;
  current:TaskType | null = null;
  dispatch: Function;

  constructor(name:string, flow:Flow) {
    this.name = name;
    this.flow = flow;
    this.dispatch = flow.dispatch;
  };

  run = (taskName:string, _task:Function) => {
    const task:TaskType = { taskName, _task, name: taskName };
    this.taskList.set(taskName, task);

    if (this.first === null) this.first = task;
    if (this.current === null) this.current = task;

    if (this.current !== task) {
      this.current.next = task;
      task.pre = this.current;
      this.current = task;
    };

    return this;
  };

  start = (data:unknown, finished:Function):void => {
    const { first } = this;
    // run task
    if (first) return this.runTask(first, data, finished);
    // next runner start
    if (this.next) return this.next.start(data, finished);
    // finished now
    finished()
  };

  runTask = (task:TaskType, data:unknown, finished: Function):void => {
    const { taskName, _task, next} = task;
    this.dispatch('run', { runner: this, task, data });
    let over = false;

    const finishProxy = (error?:any) => {
      over = true;
      finished(taskName, error);
    };

    const nextProxy = (currentData:unknown) => {
      // 如果中间触发结束过，这里不应该执行的
      if (over) return;
      if (!next) {
        if (!this.next) return finishProxy();
        return this.next.start(data, finished);
      };
      if (currentData !== undefined) return this.runTask(next, currentData, finished);
      return this.runTask(next, data, finished);
    };
    _task(data, nextProxy, finishProxy);
  };

};

export default TaskRunner;
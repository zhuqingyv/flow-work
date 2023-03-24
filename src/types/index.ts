import Flow from "..";
import FlowCore from "../FlowCore";

export type FlowCoreType = {
  name:string;
};

export enum InterceptType {
  REGISTER = 'register',
  RUN = 'run',
  ERROR = 'error',
  CALL = 'call',
}

export interface TaskType {
  name: TaskType['taskName'];
  taskName: string;
  _task: Function;

  pre?:TaskType | null;
  next?:TaskType | null;
}

export interface TaskRunnerType {

}

export interface InterfaceRegisterEventType {
  runner: FlowCore;
};

export interface InterfaceRunEventType {
  runner: FlowCore;
  task: TaskType;
  data: unknown;
};

export interface InterfaceOptionsType {
  'register'?: (event:InterfaceRegisterEventType) => unknown;
  'run'?: (event: InterfaceRunEventType) => unknown;
  'error'?:Function;
  'call'?:(event: { flow: Flow }) => unknown;
};
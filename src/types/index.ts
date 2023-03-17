export type FlowCore = {
  name:string;
};

export enum InterceptType {
  REGISTER = 'register',
  RUN = 'run',
  ERROR = 'error',
  CALL = 'call',
}
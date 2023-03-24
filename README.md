## install

### Get Start

``` javascript
import { workFlow } from 'flow-work';

const flow = workFlow('test');

flow
  .tap('init')
  .run('initChildren', (data:any, next:Function) => {
    setTimeout(() => {
      next(data);
    }, 1000);
  })
  .run('initSlots', (data:any, next:Function) => {
    setTimeout(() => {
      next(data);
    }, 1000);
  });

flow
  .tap('render')
  .run('app', (data:any, next:Function) => {
    setTimeout(() => {
      next(data);
    }, 1000);
  })
  .run('renderChildren', (data:any, next:Function) => {
    setTimeout(() => {
      next(data);
    }, 1000);
  })
  .run('renderSlots', (data:any, next: Function) => {
    setTimeout(() => {
      next(data);
    }, 1000);
  });

flow.intercept({
  run: (event) => {
    const { runner, task, data } = event;
    console.log(`${task.taskName} => ${runner.name}`, data);
  },
  register: ({ runner }) => {
    console.log('register', runner);
  },
  call: (event) => {
    console.log('call', event.flow);
  }
});

flow.call('example', (lastTaskName:string, error:any) => {
  console.log('finished', {lastTaskName, error})
});


```

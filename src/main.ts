import './style.css';
import Flow from './index';

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
const flow = new Flow('test');

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
  })

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
  })

flow.intercept({
  run: () => {}
})

flow.call('example', (lastTaskName:string, error:any) => {
  console.log('finished', {lastTaskName, error})
})


import TaskRunner from "./TaskRunner";
class FlowCore {
  name:string = '';
  currentRunner: TaskRunner|null = null;
  update = (runner:TaskRunner) => {

    const { currentRunner } = this;

    if (currentRunner && currentRunner !== runner) {
      currentRunner.next = runner
      runner.pre = currentRunner;
      this.currentRunner = runner;
    };
  };

  stop = () => {};
};

export default FlowCore;
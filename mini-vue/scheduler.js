export class Scheduler {
  static queues = [];

  _enqueue(watcher) {
    Scheduler.queues.push(watcher);
    Promise.resolve().then(() => {
      watcher._compile();
      Scheduler._dequeue(watcher);
    });
  }

  _dequeue(watcher) {
    const index = this.queues.indexOf(watcher);
    if (index !== -1) {
      this.queues.splice(index, 1);
    } else {
      throw new Error(`the watcher is not exist in queues:
        ${JSON.stringify(warcher)}`);
    }
  }
}

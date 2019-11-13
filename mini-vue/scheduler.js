export class Scheduler {
  static queues = [];

  static enqueue(watcher) {
    Scheduler.queues.push(watcher);
    setTimeout(() => {
      watcher.run();
      Scheduler.dequeue(watcher);
    });
  }

  static dequeue(watcher) {
    const index = this.queues.indexOf(watcher);
    if (index !== -1) {
      this.queues.splice(index, 1);
    } else {
      throw new Error(`the watcher is not exist in queues:
        ${JSON.stringify(warcher)}`);
    }
  }
}

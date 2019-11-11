export class Watcher {
  constructor() {}

  run() {
    Compiler._compile();
  }

  update() {
    Scheduler._enqueue();
  }
}

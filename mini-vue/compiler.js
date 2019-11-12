import { Watcher } from "./watcher";

export class Compiler {
  constructor(vm) {
    this.vm = vm;
    this.$el = vm.$el;

    this.init();
  }

  init() {
    new Watcher(this.vm, this.updateComponent, () => {});
  }

  updateComponent() {
    // TODO:
    console.log("updateComponent");
  }
}

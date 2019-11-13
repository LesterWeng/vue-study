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
    // TODO:virtual dom;DIFF
    // 模拟数据使用
    const invokeData = data => {
      for (let k of Object.keys(data)) {
        const val = data[k];
        if (Object.prototype.toString.call(val) === "[object Object]") {
          invokeData(val);
        }
      }
    };
    invokeData(this.vm.$data);
    console.log("updateComponent");
  }
}

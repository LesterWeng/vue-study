import { Scheduler } from "./scheduler";
import { Dep } from "./observer";

let uid = 1;

/**
 * @param expOrFn 更新视图的expression或函数
 * @param cb watch选项或$watch回调函数
 */
export class Watcher {
  constructor(vm, expOrFn, cb) {
    this.id = uid++;
    this.vm = vm;
    this.cb = cb;

    if (expOrFn instanceof Function) {
      this.getter = expOrFn;
    } else {
      this.getter = parseGetter(expOrFn);
    }
    // 初次渲染，依赖收集
    this.value = this.get();
  }

  parseGetter(expOrFn) {
    // TODO:
    return function() {};
  }

  get() {
    Dep.target = this;

    // 实际调用了updateComponent更新视图
    this.getter();

    Dep.target = null;
  }

  run() {
    // 不管该watcher是观察属性变化还是对应的$watch，都先更新视图
    this.value = this.get();

    // watch选项和$watch方法
    if (this.cb) {
      const newVal = this.get(),
        preVal = this.value;
      this.cb.call(this.vm, preVal, newVal);
    }
  }

  update() {
    // 微任务队列异步更新ui
    Scheduler.enqueue(this);
  }
}

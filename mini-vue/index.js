// 观察者模式-数据驱动Dom
// 关系:一数据 -> 多dom

// 数据 => data中的key => 抽象为依赖Dep
// Dom(异步调度-vDom-render) <= 抽象的观察者Watcher

import { observe } from "./observer";
import { Compiler } from "./compiler";

export default class MiniVue {
  constructor(options) {
    this.init(options);
  }

  // 目前：不支持Array
  init(options) {
    this.$el = document.querySelector(options.el);
    this.$options = options;
    this.$data = options.data();

    observe(this.$data);

    new Compiler(this);
  }
}

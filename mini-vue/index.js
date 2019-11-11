// 观察者模式-数据驱动Dom
// 关系:一数据 -> 多dom

// 数据 => data中的key => 抽象为依赖Dep
// Dom(异步调度-vDom-render) <= 抽象的观察者Watcher

import { observe } from './observer';
import { Watcher } from './watcher';
import { Compiler } from './compiler';
import { Scheduler } from './scheduler';

class MiniVue {
  constructor(options) {
    this._init(options);
  }

  // 目前：不支持Array
  _init(options) {
    this.$el = document.querySelector(options.el);
    this.$options = options;
    this.$data = options.data();

    this._defineReactive(this.$data);
  }
}

new MiniVue({
  el: '#app',
  data() {
    return {
      number: 0,
    };
  },
  methods: {
    onClickButton() {},
  },
});

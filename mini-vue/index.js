// 观察者模式-数据驱动Dom
// 关系:一数据 -> 多dom

// 数据 => data中的key => 抽象为依赖Dep
// Dom(异步调度-vDom-render) <= 抽象的观察者Watcher

// Observer
class Watcher {
  constructor(selector) {
    this.selector = selector;
    this.el = document.querySelector(selector);
  }

  update(value) {
    this.el.innerText = `${value}`;
    console.log(`update innerText of '${this.selector}' to '${value}'`);
  }
}

// Subject
class Dep {
  constructor() {
    this.value = null;
    this.obs = [];
  }

  addOb(ob) {
    const index = this.obs.indexOf(ob);
    if (index === -1) {
      this.obs.push(ob);
    }
  }

  removeOb(ob) {
    const index = this.obs.indexOf(ob);
    if (index !== -1) {
      this.obs.splice(index, 1);
    }
  }

  notify() {
    for (const ob of this.obs) {
      ob.update(this.value);
    }
  }
}

const data = {
  x: 1,
  y: 2,
};

for (const k of Object.keys(data)) {
  const descriptor = Object.getOwnPropertyDescriptor(data, k);
  const getter = descriptor && descriptor.get;

  const dep = new Dep();
  Object.defineProperty(data, k, {
    configurable: true,
    enumerable: true,
    get() {
      const watcher = new Watcher('.div' + k.toUpperCase());
      dep.addOb(watcher);
      return getter ? getter() : descriptor.value;
    },
    set(value) {
      dep.value = value;
      dep.notify();
    },
  });

  // 模拟初次渲染调用
  document.querySelector('.div' + k.toUpperCase()).innerText = data[k];
}

setTimeout(() => {
  data.x = 2;
}, 1000);
setTimeout(() => {
  data.y = 3;
}, 1000);

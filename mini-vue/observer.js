let uid = 1;

export class Dep {
  // target目的在于将当前watcher全局化，便于访问
  static target = null;

  constructor() {
    this.id = uid++;
    this.subs = [];

    // 使用ids主要出于性能考虑，has性能比indexOf好很多
    this.subIds = new Set();
  }

  addSub(sub) {
    if (this.subIds.has(sub.id)) {
      this.subs.push(sub);
      this.subIds.add(sub.id);
    }
  }

  remSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
  }

  depend() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  notify() {
    for (const sub of this.subs) {
      sub.update();
    }
  }
}

export class Observer {
  constructor(data) {
    this.walk(data);
  }

  defineReactive(data, key, val) {
    const dep = new Dep();

    if (Object.prototype.toString.call(val) === "[object Object]") {
      observe(val);
    } else {
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          dep.depend();
          return val;
        },
        set(newVal) {
          if (val === newVal) return;

          val = newVal;
          dep.notify();
        }
      });
    }
  }

  walk(data) {
    for (const key of Object.keys(data)) {
      const val = data[key];
      this.defineReactive(data, key, val);
    }
  }
}

export function observe(data) {
  return new Observer(data);
}

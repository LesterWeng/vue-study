class Dep {
  static target = null;

  constructor() {
    this.value = null;
    this.subs = [];
  }

  // 由于要维护sub的depIds数据，只能由sub(watcher)主动增删
  addSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index === -1) {
      this.subs.push(sub);
    }
  }

  remSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
  }

  depend() {
    this.addSub(Dep.target);
  }

  notify() {
    for (const sub of this.subs) {
      sub.update(this.value);
    }
  }
}

export class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    for (const key of Object.keys(data)) {
      const val = data[key];
      this.defineReactive(data, key, val);
    }
  }

  defineReactive(data, key, val) {
    const dep = new Dep();

    if (Object.prototype.toString.call(val) === '[object Object]') {
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
          dep.value = newVal;
          dep.notify();
        },
      });
    }
  }
}

export function observe(data) {
  return new Observer(data);
}

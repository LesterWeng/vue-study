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

export class Observer {
  defineReactive(data) {
    for (const k of Object.keys(data)) {
      const val = data[k];
      const dep = new Dep();

      if (Object.prototype.toString.call(val) === '[object Object]') {
        observe(val);
      } else {
        Object.defineProperty(data, k, {
          configurable: true,
          enumerable: true,
          get() {
            // 这里数据可能用于N个元素的渲染
            const watcher = new Watcher('.div' + k.toUpperCase());
            dep.addOb(watcher);
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
}

export function observe() {}

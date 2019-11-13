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

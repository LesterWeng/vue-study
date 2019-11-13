// import Vue from "./vue";

// new Vue({
//   el: "#app",
//   data() {
//     return {
//       msg: "Hello"
//     };
//   },
//   mounted() {
//     this.msg = "gg";
//   }
// });
import MiniVue from "./mini-vue/index.js";

let obj = {
  num: 0
};

setTimeout(() => {
  obj.num++;
  console.log(obj.num);
}, 2000);

new MiniVue({
  el: "#app",
  data() {
    return {
      obj
    };
  },
  methods: {
    onClickButton() {}
  }
});

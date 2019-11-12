// new Vue({
//   el: '#app',
//   data() {
//     return {
//       msg: 'Hello',
//     };
//   },
//   mounted() {
//     this.msg = 'gg';
//   },
// });
import MiniVue from "./mini-vue/index.js";

new MiniVue({
  el: "#app",
  data() {
    return {
      number: 0
    };
  },
  methods: {
    onClickButton() {}
  }
});

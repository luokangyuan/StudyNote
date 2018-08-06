
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

new Vue({
  el: '#app', // 挂载到入口Dom节点（index.html）
  components: { App }, // 映射组件标签
  template: '<App/>' //使用标签
})

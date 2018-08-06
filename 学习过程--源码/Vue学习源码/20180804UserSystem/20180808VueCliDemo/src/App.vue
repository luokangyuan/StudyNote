<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <!-- 使用组件标签 -->
    <HelloWorld/> 
  </div>
</template>

<script>
// 1.引入需要使用的vue组件（HelloWoed组件）
import HelloWorld from './components/HelloWorld'

export default {
  components: { // 2.映射组件标签
    HelloWorld
  }
}
</script>

<style>
.logo{
    width: 100px;
    height: 100px;
}
</style>

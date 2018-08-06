<template>
    <div class="hello">
        <h1 class="msg">{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    // 配置对象和Vue一致
    data() {
        // data可以 写对象和函数，但是在组件中必须使用函数
        return {
            msg: "Hello Welcome to My Vue"
        };
    }
};
</script>

<style scoped>
    .msg {
        color: red
    }
</style>

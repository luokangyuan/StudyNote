<template>
    <div id="app">
        <header class="site-header jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h1>请发表对Vue的评论</h1>
                    </div>
                </div>
            </div>
        </header>
        <div class="container">
            <Add/>
            <List/>
        </div>
    </div>
</template>

<script>
// 1.引入需要使用的vue组件（HelloWoed组件）
import Add from "./components/Add";
import List from "./components/List";

export default {
    components: {
        // 2.映射组件标签
        Add,
        List
    }
};
</script>

<style>
.logo {
    width: 100px;
    height: 100px;
}
</style>

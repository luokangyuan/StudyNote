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
            <!-- 组件之间将方法传递给子组件 -->
            <Add :addComment = "addComment"/>
            <!-- 组件之间的通信，向子组件传递数组 -->
            <List :comments = "comments"/> 
        </div>
    </div>
</template>

<script>
// 1.引入需要使用的vue组件
import Add from "./components/Add.vue";
import List from "./components/List.vue";

export default {
    data(){
        return {
            comments: [
                {
                    name: '张三',
                    content: 'Vue使用了一段时间，还不错'
                },
                 {
                    name: '李四',
                    content: 'Vue使用了一段时间，还不错'
                },
                 {
                    name: '王五',
                    content: 'Vue使用了一段时间，还不错'
                }
            ]
        }
    },
    methods: {
        // 添加评论
        addComment (comment){
            this.comments.unshift(comment);
        }
    },
    components: {
        // 2.映射组件标签
        Add,
        List
    }
};
</script>

<style>

</style>

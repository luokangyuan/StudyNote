<template>
    <div class="col-md-8">
        <h3 class="reply">评论回复：</h3>
        <h2 style='display: none'>暂无评论，点击左侧添加评论！！！</h2>
        <ul class="list-group">
            <!-- 遍历父组件App传递的数据，将每一个数据传递给Item组件 -->
            <Item v-for="(comment,index) in comments" :key="index" :comment="comment"></Item>
        </ul>
    </div>
</template>
<script>
import Item from "./Item.vue"; // 使用Item组件
export default {
    // 声明接收父组件传递的数据属性，这个属性就会成为组件对象的属性
    props: ["comments"],
    components: {
        Item
    }
};
</script>
<style>
.reply {
    margin-top: 0px;
}
.list-group-item .centence {
    padding: 0px 50px;
}
.user {
    font-size: 22px;
}
</style>


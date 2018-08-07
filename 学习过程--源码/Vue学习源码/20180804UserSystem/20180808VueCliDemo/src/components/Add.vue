<template>
    <div class="col-md-4">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label>用户名</label>
                        <input type="text" class="form-control" placeholder="用户名" v-model="name">
                    </div>
                    <div class="form-group">
                        <label>评论内容</label>
                        <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="button" class="btn btn-default pull-right" @click = "add">提交</button>
                        </div>
                    </div>
                </form>
            </div>
</template>
<script>
    export default {
        data() {
            return {
                 name: '',
                content: ''
            }
        },
        methods: {
            add(){
                // 检查输入的合法性
                const name = this.name.trim();
                const content = this.content.trim();
                // 根据输入的数据，封装成个comment对象
                // 添加到comments中
            }
        }
    }
</script>

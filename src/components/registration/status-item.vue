
<template>
<!-- 
    状态码的组件
    从父级组件中接收到的status数据，通过本地对象数据的名字来选中当前的数据中的值
 -->
    <div class="status" :style="{backgroundColor:statusData[status].color}">
        {{ statusData[status].label }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            statusData:{
                1:{label:'闲置',color:'#67c23a'},
                2:{label:'在用',color:'#409eff'},
                3:{label:'借用',color:'#1898d1'},
                4:{label:'维修中',color:'#e6a23c'},
            }
        }
    },
    props:{
        status:{
            default:1,
            required:true
        }
    }
}
</script>

<style>
    .status{
        width: 54px;
        height: 26px;
        line-height: 26px;
        text-align:center;
        margin:auto;
        border-radius: 20px;
        /* border-radius:  */
    }
</style>
<template>
<!-- 
    仪表盘内容页签字组件
 -->
    <div class="sign">
        <span>
            <p>待签字</p>
            <p>222</p>
        </span>
        <span>
            <p>待签字</p>
            <p>222</p>
        </span>
        <span>
            <p>待签字</p>
            <p>222</p>
        </span>
        <span>
            <p>待签字</p>
            <p>222</p>
        </span>
        <span>
            <p>待签字</p>
            <p>222</p>
        </span>
        <span>
            <p>待签字</p>
            <p>222</p>
        </span>
    </div>
</template>

<style>
    .sign{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }
    .sign span{
        color: aliceblue;
        display: inline-block;
        width: 15%;
        height: 80px;
        border-radius: 5px;
        background: #409eff url(../../assets/table.png) bottom/auto no-repeat;
        padding: 10px 10px;
        box-sizing: border-box;
        font-size: 20px;
        line-height:30px;
    }
    .sign span p:nth-child(1){
        font-size: 12px;
    }
</style>

<script>
export default {
    
}
</script>
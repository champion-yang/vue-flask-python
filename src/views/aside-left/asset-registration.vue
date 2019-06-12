<template>
    <div>
        <!-- 这是资产登记 -->
        <breadCrumb/>
        <registion/>
    </div>
</template>
<script>
import breadCrumb from "@/components/others/bread-crumb"
import registion from '@/components/registration/registionTable'
    export default{
        components:{
            registion,
            breadCrumb,
        }
    }
</script>
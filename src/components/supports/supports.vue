<template>
    <div>
        <div  v-if="seller.supports" class="support-item" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            seller:{
                type:Object
            }
        },
        data(){
            return{
                classMap:[],
            }
        },
        mounted(){
            this.classMap=['decrease','dis-count','special','invoice','guarantee'];
        },
    }
</script>

<style lang="stylus" scoped>
.support-item
    padding 16px
    .icon
        display inline-block
        width 16px
        height 16px
        vertical-align top
        margin-right 6px
        background-size 16px 16px
        background-repeat no-repeat
        line-height 16px
        &.decrease
            background-image url(decrease_3@2x.png)
        &.dis-count
            background-image url(discount_3@2x.png)
        &.guarantee
            background-image url(guarantee_3@2x.png)
        &.invoice
            background-image url(invoice_3@2x.png)
        &.special
            background-image url(special_3@2x.png)
    .text
        line-height 16px
        font-size 12px
        vertical-align top
        color rgb(7,17,27)
</style>
<template>
    <div>
        <div id="header">
            <div class="background" :style="{backgroundImage:'url(' + seller.avatar + ')'}"> </div>
            <div class="content-box">
                <div class="left-box">
                    <img class="toux" :src="seller.avatar" alt="">
                </div>
                <div class="right-box">
                    <div class="seller">
                        <img class="seller-logo" src="../../../resource/img/brand@2x.png" alt="">
                        <span class="seller-name">{{seller.name}}</span>
                    </div>
                    <div class="sendway">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                    <div class="discount">
                        <span class="discount-logo" v-if="seller.supports" :class="classMap[seller.supports[0].type]"></span>
                        <span class="discount-font" v-if="seller.supports">{{seller.supports[0].description}}</span>
                    </div>
                    <div class="count" @click="countShow()">
                        <span class="num" v-if="seller.supports">{{seller.supports.length}}个</span>
                        <i class="icon-keyboard_arrow_right"></i>
                    </div>
                </div>
            </div>
            <div class="gonggao">
                <img src="../../../resource/img/bulletin@2x.png" alt="">
                <span>{{seller.bulletin}}</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>   
        </div>
        <transition name="fade">
            <div class="count-popover" v-show="show">
                <div class="content-wrapper clearfix">
                    <div class="mainContent">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <v-star :size="48" :score="seller.score"></v-star>
                        </div>
                        <div class="title">
                            <span class="line"></span>
                            <span class="text">优惠信息</span>
                            <span class="line"></span>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <span class="line"></span>
                            <span class="text">商家公告</span>
                            <span class="line"></span>
                        </div>
                        <p class="bulletin">{{seller.bulletin}}</p>
                    </div>
                </div>
                <div class="content-close">
                    <i class="icon-close" @click="countClose()"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Star from "../star/star.vue"
    export default{
        data(){
            return{
                show:false,
                classMap:[],
            }
        },
        methods:{
            countShow(){
                this.show=true;
            },
            countClose(){
                this.show=false;
            }
        },
        mounted(){
            this.classMap=['decrease','dis-count','special','invoice','guarantee'];
        },
        props:['seller'],
        components: {
            'v-star':Star
        },
    }
</script>
<style lang="stylus" scoped>

#header
    background-size 100% 
    position relative 
    z-index:20   
    .background 
        width:100%
        height:100%
        position: absolute
        left:0
        top:0
        background: inherit
        z-index -1


    .content-box
        display: flex
        flex-direction: row
        background :rgba(7,17,27,0.5)
        .left-box
            padding: 24px 0 18px 24px
            margin-right 16px
            & > img
                display: block
                width: 64px
                height: 64px
                border-radius 4px
        .right-box
            width: 100%
            padding: 24px 24px 18px 0
            position relative
            .seller
                margin: 2px 0 8px 0
                & > img 
                    height: 18px
                    float: left
                    margin-right: 6px
                .seller-name
                        font-size: 16px
                        color: #fff
                        font-weight: bold
                        line-height: 18px
            .sendway
                font-size: 12px
                color: #fff
                font-weight: 200
                line-height: 12px
                margin-bottom: 10px
            .discount
                width:100%
                height 12px
                .discount-logo
                    height: 12px
                    width: 12px
                    float: left
                    margin-right: 4px
                    background-size 12px 12px

                    &.decrease
                        background-image url(decrease_1@2x.png)
                    &.dis-count
                        background-image url(discount_1@2x.png)
                    &.guarantee
                        background-image url(guarantee_1@2x.png)
                    &.invoice
                        background-image url(invoice_1@2x.png)
                    &.special
                        background-image url(special_1@2x.png)
                .discount-font
                    font-size: 10px
                    line-height: 12px
                    font-weight: 200
                    color: rgb(255,255,255)
                    float: left
            .count 
                position absolute
                font-size 0
                color rgb(255,255,255)
                display flex
                align-items: center
                line-height: 12.5px
                bottom: 14px
                right: 24px
                background: rgba(0,0,0,0.4)
                padding: 7px 8px
                border-radius 20px
                bottom
                .num
                    font-size 10px
                    margin-right 4px
                & > i 
                    font-size 10px
    .gonggao
        background: rgba(7,17,27,0.7)
        padding: 0 12px
        display: flex
        align-items: center
        font-size 0
        & > img
            height 14px
            float left
            margin-right 4px
        & > span 
            display: inline-block
            font-size: 10px
            color: #fff
            font-weight: 200
            height: 28px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            width: 100%
            line-height: 28.5px
        & > i 
            color #ffffff
            font-size 10px

.count-popover
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    overflow auto 
    background rgba(7,17,27,0.8)
    z-index 100
    &.fade-enter-active,&.fade-leave-active
        transition: all 0.5s
    &.fade-enter,&.fade-leave-to
        opacity 0
    .content-wrapper
        min-height 100%
        width 100%
        .mainContent
            width 100%
            text-align center 
            color #ffffff
            margin-top 64px
            padding-bottom 64px
            .name
                font-size 16px
                font-weight 700
                line-height 32px
    
            .star-wrapper
                padding 16px 0 18px 0
            .title
                padding 0 36px
                display flex
            
                .line
                    height 0
                    flex 1
                    border 1px solid rgba(255,255,255,0.2)
                    position relative
                    top 7px
                .text
                    line-height 16px
                    font-weight 700
                    color #ffffff
                    font-size 14px 
                    padding 0 12px
            .supports
                width 80%
                margin 0 auto 
                display flex
                flex-flow column
                padding 24px 0 28px 0
                .support-item
                    padding 0 12px 
                    margin-bottom 12px
                    font-size 0
                    display flex
                    align-items center
                    line-height 24px
                    &:last-child
                        margin-bottom 0
                    .icon
                        display inline-block
                        width 16px
                        height 16px
                        vertical-align top
                        margin-right 6px
                        background-size 16px 16px
                        background-repeat no-repeat
                        &.decrease
                            background-image url(decrease_2@2x.png)
                        &.dis-count
                            background-image url(discount_2@2x.png)
                        &.guarantee
                            background-image url(guarantee_2@2x.png)
                        &.invoice
                            background-image url(invoice_2@2x.png)
                        &.special
                            background-image url(special_2@2x.png)
                    .text
                        line-height 12px
                        font-size 12px
            .bulletin
                font-size 12px
                font-weight 200
                color #ffffff
                line-height 24px
                width 80%
                margin 24px auto 0 auto 
                text-align left 

                        



    
    .content-close
        position relative
        width 16px
        height 16px
        margin -64px auto 0 auto
        clear both
        font-size 32px
        color rgba(255,255,255,0.5)






</style>

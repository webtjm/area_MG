<template>
<transition name="move">
    <div class="food" v-show="showFlag" ref="foodDom">
        <div class="food-content">
            <div class="img-header">
                <img :src="food.image">
                <div class="back" @click="hide()">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
                <transition name="fade">
                    <div @click="addFirst($event)" class="addBuy" v-show="!food.count || food.count === 0">加入购物车</div>
                </transition>
            </div>
            <div class="spilt" v-show="food.info"></div>
            <div class="info" v-show="food.info">
                <h1 class="title">商品介绍</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <div class="spilt" v-show="food.info"></div>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <v-rating @onlycontentChange="changeOnlycontent" @selectchange="changeSelect" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></v-rating>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="rating-item">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img :src="rating.avatar" class="avatar" width="12" height="12">
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                                {{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价~~~</div>
                </div>
            </div>
        </div>
    </div>
    
</transition>
    
</template>

<script>

import Vue from 'vue'
    import BScroll from 'better-scroll'
    import Cartcontrol from '../cartcontrol/cartcontrol.vue'
    import Rating from '../rating/rating.vue'
    import {formatDate} from '../../common/js/date.js';
    
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        data(){
            return{
                showFlag:false,
                selectType:ALL,
                onlyContent:false,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        props:{
            food:{
                type:Object
            }
        },
        components:{
            'v-cartcontrol':Cartcontrol,
            'v-rating':Rating
        },
        computed:{
            
        },
        methods:{
            show(){
                this.showFlag = true;
                //商品详情组件时初始化状态
                this.selectType=ALL;
                this.onlyContent=false;

                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.foodDom,{click:true})
                    }else{
                        this.scroll.refresh();
                    }
                });
            },
            hide(){
                this.showFlag = false;  
            },
            addFirst(event){
                if(!event._constructed){
                    return;
                }
                Vue.set(this.food,'count',1);
            },
            changeSelect(val){
                this.selectType=val;
                //切换评论时，区域高度会改变，需重新计算
                this.$nextTick(()=>{
                    this.scroll.refresh();
                });
            },
            changeOnlycontent(val){
                this.onlyContent=val;
            },
            needShow(type,text){
                if(this.onlyContent&&!text){
                    //如果只看内容而又没有内容，不显示
                    return false;
                }else if(this.selectType === ALL){
                    /*
                    如果父组件接收到子组件传过来的selectType
                    /是ALL的话，全部显示
                    */
                    return true;
                }else{
                    /*
                    rateType等于父组件接收到子组件
                    传过来的selectType的评价才给显示
                    */
                    return type === this.selectType;
                }

            }
        }

    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.food
    position fixed
    left 0
    top 0px 
    bottom 48px
    z-index 30
    width 100%
    background #ffffff
    &.move-enter-active,&.move-leave-active
        transition all 0.5s
        transform  translate3d(0,0,0)
    &.move-enter,&.move-leave-to
        transform  translate3d(100% ,0,0)
    .food-content
        .img-header
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0px
                left 0
                width 100%
                height 100%
        .back
            position absolute
            top 10px
            left 0
            .icon-arrow_lift
                display block
                padding 10px
                font-size 20px
                color #ffffff
        .content
            padding 18px
            position relative
            .title
                line-height 14px
                margin-bottom 8px
                font-size 14x
                font-weight 700
                color rgb(7,17,27)
            .detail
                margin-bottom 18px
                line-height 10px
                height 10px
                font-size 0
                .sell-count,.rating
                    font-size 10px
                    color rgb(147,153,159)
                .sell-count
                    margin-right 12px
            .price
                line-height 24px
                .now
                    margin-right 8px
                    font-size 14px
                    color rgb(240,20,20)
                    font-weight 700
                .old
                    text-decoration line-through
                    font-size 10px
                    color rgb(147,153,159)
                    font-weight 700
            .cartcontrol-wrapper
                position absolute
                right 12px
                bottom 12px
            .addBuy
                position absolute
                right 18px
                bottom 18px
                z-index 10
                height 24px
                line-height 24px
                padding 0 12px
                box-sizing border-box
                border-radius 12px
                font-size 10px
                color #ffffff
                background rgb(0,160,220)
                &.fade-enter-active,&.fade-leave-active
                    transition all 0.2s
                &.fade-enter,&.fade-leave-to
                    opacity 0
        .info
            padding 18px
            .title
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7,17,27)
            .text
                line-height 24px
                padding 0 8px
                font-size 12px
                color rgb(77,85,93)
        .rating
            padding-top 18px
            .title
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7,17,27)
            .rating-wrapper
                padding 0 18px
                .rating-item
                    position relative
                    padding 16px 0
                    border-1px(rgba(7,17,27,0.1))
                    .user
                        position absolute
                        right 0
                        top 16px
                        line-height 12px
                        font-size 0
                        .name
                            display inline-block
                            margin-right 6px
                            vertical-align top
                            font-size 10px
                            color rgb(147,153,159)
                        .avatar
                            border-radius 50%
                    .time
                        margin-bottom 6px
                        line-height 12px
                        font-size 10px
                        color rgb(147,153,159)
                    .text
                        line-height 16px
                        font-size 12px
                        color rgb(7,17,27)
                        .icon-thumb_up,.icon-thumb_down
                            margin-right 4px
                            font-size 12px
                        .icon-thumb_up
                            color rgb(0,160,220)
                        .icon-thumb_down
                            color rgb(147,153,159)
                    
                .no-rating
                    padding 16px 0
                    font-size 12px
                    color rgb(147,153,159)



        
        


</style>
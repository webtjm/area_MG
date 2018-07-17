<template>
    <div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList()"></div>
        </transition>
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="toggleList()">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'hightLight':totalCount>0}">
                            <i class="icon-shopping_cart" :class="{'hightLight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'heightLight':totalPrice > 0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="payClass" @click="pay()">{{spreadPrice}}</div>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty()">清空</span>
                    </div>
                    <div class="list-content" ref="foodList">
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" 
                            :key="index">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <v-cartcontrol :food="food"></v-cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import Cartcontrol from '../cartcontrol/cartcontrol.vue';
    import BScroll from 'better-scroll'; 
    export default {
        data(){
            return{
                fold:true,
            }
        },
        props:{
            selectFoods:{
                type:Array,
            },
            deliveryPrice:{
               type:Number
            },
            minPrice:{
               type:Number
            }
        },
        components:{
            'v-cartcontrol':Cartcontrol,
        },
        methods:{
            toggleList(){
                if(!this.totalCount){
                    return;
                }
                this.fold = !this.fold;
            },
            initScroll(){
                this.foodListScroll = new BScroll(this.$refs.foodList,{click:true});
            },
            empty(){
                this.selectFoods.forEach((food)=>{
                    food.count = 0;
                })
            },
            hideList(){
                this.fold = true;
            },
            pay(){
                if(this.totalPrice < this.minPrice){
                    return;
                }
                window.alert('支付'+this.totalPrice+'元');
            }
        },
        computed:{
            totalPrice(){
                var total = 0;
                this.selectFoods.forEach((food)=>{
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount(){
                var count = 0;
                this.selectFoods.forEach((food)=>{
                    count += food.count;
                });
                return count;
            },
            spreadPrice(){
                if(this.totalPrice === 0){
                    return '￥'+this.minPrice+'元起送';
                }else if(this.totalPrice<this.minPrice){
                    var diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                }else{
                    return '去结算';
                }
            },
            payClass(){
                if(this.totalPrice<this.minPrice){
                    return 'not-enough';
                }else{
                    return 'enough';
                }
            },
            listShow(){
                if(!this.totalCount){
                    this.fold = true;
                    return false;
                }
                var show = !this.fold;
                if(show){
                    this.$nextTick(()=>{
                        if(!this.foodListScroll){ 
                            this.initScroll();
                        }else{
                            this.foodListScroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        mounted(){
        
        }
           
        
    }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixin.styl';
    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index 40
        background rgba(7,17,27,0.6)
        transition all 0.2s 
        &.fade-enter-active,&.fade-leave-active
            opacity 1
        &.fade-enter,&.enter-leave-to
            opacity 0
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        .shopcart-list
            position absolute
            left 0
            bottom 48px
            z-index -1
            width 100%
            transition all 0.5s
            &.fold-enter-active,&.fold-leave-active
                transform translate3d(0,0,0)
            &.fold-enter,&.fold-leave-to
                transform translate3d(0,100%,0)
            .list-header
                height 40px
                line-height 40px
                padding 0 18px
                background #f3f5f7
                border-bottom 1px solid rgba(7,17,27,0.1)
                .title
                    float left
                    font-size 14px
                    color rgb(7,17,27)
                .empty
                    float right 
                    font-size 12px
                    color rgb(0,160,220)
            .list-content
                padding 0 18px
                max-height 217px
                overflow hidden
                background #ffffff
                .food
                    position relative
                    padding 12px
                    box-sizing border-box
                    border-1px(rgba(7,17,27,0.1))
                    .name
                        line-height 24px
                        font-size 14px
                        color rgb(7,17,27)
                    .price
                        position absolute
                        right 90px
                        bottom 12px
                        line-height 24px
                        font-size 14px
                        font-weight 700
                        color rgb(240,20,20)
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 6px

        .content
            display flex
            background #141d27
            height 48px
            color rgba(255,255,255,0.4)
            .content-right
                flex 0 0 105px
                width 105px 
                .pay
                    height 48px
                    line-height 48px
                    text-align center
                    font-size 12px
                    font-size 12px
                    font-weight 700
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color #fff
            .content-left
                flex 1
                font-size 0
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    border-radius 50%
                    background #141d27
                    .logo
                        width 100%
                        heigt 100% 
                        border-radius 50%
                        background #2b343c
                        text-align center
                        &.hightLight
                            background rgb(0,160,220)
                        .icon-shopping_cart
                            line-height 44px
                            font-size 24px
                            color #80858a
                            &.hightLight
                                color:#fff

                    .num
                        position absolute
                        top 0px
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color #ffffff
                        background rgb(240,20,20)
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)

                .price
                    display inline-block
                    margin-top 12px
                    line-height 24px
                    padding-right 12px
                    box-sizing border-box
                    border-right 1px solid rgba(255,255,255,0.1)
                    font-size 16px
                    font-weight 700
                    vertical-align top
                    &.heightLight
                        color #fff
                .desc
                    display inline-block
                    vertical-align top
                    margin 12px 0 0 12px
                    line-height 24px
                    font-size 10px



                




</style>
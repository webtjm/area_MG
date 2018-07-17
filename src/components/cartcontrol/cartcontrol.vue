<template>
    <div class="cartcontrol">
        <transition name="move">
            <div @click.stop.prevent="decreaseCart($event)" class="cart-decrease" v-show="food.count>0">
                <i class="inner icon-remove_circle_outline"></i>
            </div>
        </transition>
        
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <i class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></i>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        props:{
            food:{
                type:Object,
            },
            selectFoods:{
                type:Array,
            }
        },
        mounted(){

        },
        methods:{
            addCart(event){
                if(!event._constructed){
                    return;
                }
                if(!this.food.count){
                    Vue.set(this.food,'count',1);
                }else{
                    this.food.count++;
                }
            },
            decreaseCart(event){
                if(!event._constructed){
                    return;
                }
                if(this.food.count){
                   this.food.count--;
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .cartcontrol
        font-size 0 
        .cart-decrease
            display inline-block
            padding 6px
            .inner
                display inline-block
                line-height 24px
                font-size 24px
                color:rgb(0,160,220)
            &.move-enter-active,&.move-leave-active
                transition all 0.4s Linear 
                transform translate3d(0,0,0)
                .inner
                    transition all 0.4s Linear 
                    transform rotate(0)        
            &.move-enter,&.move-leave-to
                opacity 0
                transform :translate3d(24px,0,0)
                .inner
                    transform rotate(180deg)
            
        .cart-count
            display inline-block
            font-size 10px
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            vertical-align top
            color rgb(147,153,159)
        .cart-add
            display inline-block
            padding 6px
            line-height 24px
            font-size 24px
            color:rgb(0,160,220)
            display inline-block
            padding 6px
</style>
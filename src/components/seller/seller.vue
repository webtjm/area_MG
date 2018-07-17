<template>
    <div class="seller" ref="sellerScroll">
        <div class="seller-wrapper">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <v-star class="star" :size="36" :score="seller.score"></v-star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2 class="title">起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavor($event)">
                    <span class="icon-favorite" :class="{'active':favortype}"></span>
                    <span class="text">{{favortext}}</span>
                </div>
            </div>
            <div class="spilt"></div>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
            </div>
            <div class="supports">
                <v-supports :seller="seller"></v-supports>
            </div>
            <div class="spilt"></div>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picScroll">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
             <div class="spilt"></div>
             <div class="info">
                 <h1 class="title">商家信息</h1>
                 <ul>
                     <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
                 </ul>
             </div>
        </div>
    </div>
</template>

<script>
import Star from '../star/star.vue'
import Supports from '../supports/supports.vue'
import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                icontype:"decrease_3@2x.png",
                favortype:false,
            }
        },
        props:{
            seller:{
                type:Object
            }
        },
        computed:{
            favortext(){
                return this.favortype? '已收藏':'收藏';
            }
        },
        components:{
            'v-star':Star,
            'v-supports':Supports,
        },
        methods:{
            toggleFavor(){
                if(!event._constructed){
                    return;
                }
                this.favortype=!this.favortype;
            },
            initsellerScroll(){
                if(!this.sellerScroll){
                    this.sellerScroll = new BScroll(this.$refs.sellerScroll,{click:true});
                }else{
                    this.sellerScroll.refresh();
                }       
            },
            initpicScroll(){
                if(this.seller.pics){
                    this.$nextTick(()=>{
                        var picWidth = 120;
                        var margin = 6;
                        var width = (picWidth+margin)*this.seller.pics.length;
                        this.$refs.picList.style.width = width+'px';
                        console.log(this.$refs.picList.style.width = width);
                        if(!this.picScroll){
                            this.picScroll = new BScroll(this.$refs.picScroll,
                            {scrollX:true,eventPassthrough:'vertical'}
                            );
                        }else{
                            this.picScroll.refresh();
                        }  
                    });
                    
                }     
            }
        },
        mounted(){
            this.initsellerScroll();
            this.initpicScroll();  
        },
    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
        padding 18px
        .title
            margin-bottom 8px
            line-height 14px
            color rgb(7,17,27)
            font-size 14px
        .desc
            padding-bottom 18px
            border-1px(rgba(7,17,27,0.1))
            font-size 0
            .star
                display inline-block
                margin-right 8px
                vertical-align top
                line-height 15px
            .text
                margin-right 12px
                display inline-block
                vertical-align top
                font-size 10px
                color rgb(77,85,93)
                line-height 15px
        .remark
            display flex
            padding-top 18px
            .block
                flex 1
                text-align center
                border-right 1px solid rgba(7,17,27,0.1)
                &:last-child
                    border:none
            .title
                font-size 10px
                color rgb(147,153,159)
                line-height 10px
            .content
                font-size 10px
                color rgb(7,17,27)
                .stress
                    font-size 20px
                    font-weight 200
                    line-height 24px
        .favorite
            display flex
            flex-flow column
            justify-content center
            position absolute
            top 16px
            right 5px
            width 50px
            .icon-favorite
                color #000000
                font-size 24px
                color #D4D6D9
                margin-bottom 4px
                text-align center
                &.active
                    color rgb(240,20,20)
            .text
                display block
                color #000000
                font-size 10px
                text-align center

    .bulletin
        padding 18px 18px 0 18px
        .title
            margin-bottom 8px
            line-height 14px
            color rgb(7,17,27)
            font-size 14px
        .content-wrapper
            padding 0 12px 16px 12px
            border-1px(rgba(7,17,27,0.1))
            .content
                font-size 12px
                color rgb(240,20,20)
                line-height 24px
    .supports
        padding 0 18px
        margin-bottom 2px
    .pics
        padding 18px
        .title
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
            margin-bottom 12px
        .pic-wrapper
            width 100%
            overflow hidden
            white-space nowrap
            .pic-list
                font-size 0
                .pic-item
                    display inline-block
                    margin-right 6px
                    width 120px
                    height 90px
                    &:last-child
                        margin-right 0
    .info
        padding 18px
        
        .title
            font-size 14px
            padding-bottom 12px
            border-1px(rgba(7,17,27,0.1))
            margin-bottom 10px
        .info-item
            padding 10px 12px
            font-size 12px
            color rgb(7,17,27)
            line-height 15px


</style>
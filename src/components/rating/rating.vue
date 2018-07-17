<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selecttype===2}">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selecttype===0}">
                {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selecttype===1}">
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div @click="toggleContent()" class="switch" :class="{'on':onlycontent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        //组件要维护的部分
        props:{
            //接收ratings,默认返回数组
            ratings:{
                type:Array,
                default(){
                    return [];
                }
            },
            //接收评论类型，默认选中的是‘全部’
            selectType:{
                type:Number,
                default:ALL
            },
            //接收是否看有内容的评价状态，默认false
            onlyContent:{
                type:Boolean,
                default:false
            },
            //接收评论类型
            desc:{
                type:Object,
                default(){
                    return {
                        all:'全部',
                        positive:'满意',
                        negative:'不满意'
                    };
                }
            }
        },
        data(){
            return{
                selecttype:this.selectType,
                onlycontent:this.onlyContent,
            }
        },
        computed:{
            positives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType === POSITIVE;
                });
            },
            negatives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
          select(type,event){
              if(!event._constructed){
                  return;
              }
              /*
              由于子组件改了selectType但是父组件不知道，
              所以用事件广播来使父组件知道
              */
                this.selecttype=type;
                this.$emit('selectchange',this.selecttype);
          },
          toggleContent(){
              this.onlycontent=!this.onlycontent;
              this.$emit('onlycontentChange',this.onlycontent);
          }  
        }
    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'

.ratingselect
    .rating-type
        padding:18px 0
        margin 0 18px
        border-1px(rgba(7,17,27,0.1))
        font-size 0
        .block
            display inline-block
            padding 8px 12px
            margin-right 8px
            border-radius 1px
            color rgb(77,85,93)
            line-height 16px
            font-size 12px
            &.active
                color #ffffff
            .count
                font-size 8px
                margin-left 2px
            &.positive
                background rgba(0,160,220,0.2)
                &.active
                    background rgb(0,160,220)
            &.negative
                background rgba(77,85,93,0.2)
                &.active
                    background rgb(77,85,93)
    .switch
        padding 12px 18px
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,0.1)
        color rgb(147,153,159)
        font-size 0
        &.on
            .icon-check_circle
                color rgb(0,160,220)
        .icon-check_circle
            display inline-block
            vertical-align top
            margin-right 4px
            font-size 24px
        .text
            font-size 12px
            display inline-block
            vertical-align top
</style>
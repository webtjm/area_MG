<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <ul id="tab" class="border-1px">
      <li id="tab-item"><router-link to="/goods">商品</router-link></li>
      <li id="tab-item"><router-link to="/ratings">评价</router-link></li>
      <li id="tab-item"><router-link to="/seller">商家</router-link></li>
    </ul>
    <keep-alive>
      <router-view :seller="seller" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    
  </div>
</template>

<script>

// 引入头部组件
import Header from "./components/header/header.vue"

export default {
  name: 'App',
  data(){
    return{
      seller:{
        "name": "粥品香坊（回龙观）",
        "description": "蜂鸟专送",
        "deliveryTime": 38,
        "score": 4.2,
        "serviceScore": 4.1,
        "foodScore": 4.3,
        "rankRate": 69.2,
        "minPrice": 20,
        "deliveryPrice": 4,
        "ratingCount": 24,
        "sellCount": 90,
        "bulletin": "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
        "supports": [
          {
            "type": 0,
            "description": "在线支付满28减5"
          },
          {
            "type": 1,
            "description": "VC无限橙果汁全场8折"
          },
          {
            "type": 2,
            "description": "单人精彩套餐"
          },
          {
            "type": 3,
            "description": "该商家支持发票,请下单写好发票抬头"
          },
          {
            "type": 4,
            "description": "已加入“外卖保”计划,食品安全保障"
          }
        ],
        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
        "pics": [
          "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
          "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
          "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
          "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180"
        ],
        "infos": [
          "该商家支持发票,请下单写好发票抬头",
          "品类:其他菜系,包子粥店",
          "北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
          "营业时间:10:00-20:30"
        ]
      },
    }
  },
  methods:{
    /*
      请求本地模拟数据
      getseller(){
        var api = '/api/seller';
        this.$http.get(api).then((response)=>{
          console.log(response);
          this.seller = response.body.data;
        },(err)=>{
          console.log(err);
        }
        )
      }
    */  
  },
  components:{
    "v-header":Header,
  },
  mounted(){

    /*
      请求本地模拟数据
      this.getseller();
    */ 
  }
}
</script>

<style scoped lang="stylus">
    @import './common/stylus/mixin.styl';
  
    #tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      background #fff
      // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      #tab-item 
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
  
  </style>

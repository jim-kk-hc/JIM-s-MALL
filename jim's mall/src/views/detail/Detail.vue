<template>
    <div id="detail">
            <detail-nav-bar/>
             <!-- <detail-swiper :topImages="topImages"/> -->
             <!-- <scroll class="content"> -->
            <carousel :img="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
            <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info> 
            <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>  
            <!-- <detail-bottom-bar ></detail-bottom-bar>            -->
        <!-- </scroll> -->
    </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar"
import Carousel from "components/common/carousel/Carousel"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import Scroll from "components/common/scroll/Scroll"
import DetailShopInfo from"./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottomBar from "./childComps/DetailBottomBar";

import { getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
export default {
    name:"Detail",
    data() {
        return {
            iid:'',
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendList:[]
        }
    },
    created() {
        const iid = this.$route.query.iid
        this.iid = iid
        getDetail(iid).then(res=>{
            const data=res.result
            //取出轮播图数据
            this.topImages=data.itemInfo.topImages
            
            // 获取商品信息 图片
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          this.shop  = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo
           // 保存参数信息 table
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          // 保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }    
          //获取推荐数据
          getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })     
        })
    },
    components:{
      DetailNavBar,
      Carousel,DetailBaseInfo,
      Scroll,DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,DetailCommentInfo,
      DetailRecommendInfo,DetailBottomBar
    },
    methods:{
            addToCart() {
              // 1.创建对象
              const obj = {}
              // 2.对象信息
              obj.iid = this.iid;
              obj.imgURL = this.topImages[0]
              obj.title = this.goods.title
              obj.desc = this.goods.desc;
              obj.newPrice = this.goods.nowPrice;
              // 3.添加到Store中
              this.$store.commit('addCart', obj)
      },
    }

}
</script>
<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
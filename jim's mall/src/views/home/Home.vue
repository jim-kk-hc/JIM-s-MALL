<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control 
          :titles="['流行', '新款', '精选']"
          ref="tabControl"
          v-show="isShowTabControl"
          :class="{tabControl:isShowTabControl}"
          @tabClick="tabClick"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- <home-carousel :banners="banners" @swiperImageLoad="swiperImageLoad"/>       -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" ref="hSwiper"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control 
                   :titles="['流行', '新款', '精选']"
                   ref="tabControl"
                   @tabClick="tabClick"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeCarousel from './childComps/HomeCarousel'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import { getHomeMultidata, getHomeGoods } from "network/home"

  export default {
    name: "Home",
    components: {
      HomeCarousel,
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        offsetTopBar:0,
        isShowTabControl:false,
        saveY:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    
    },
    mounted(){
        // watch 监听 防抖
      const refresh= this.debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImageLoad',()=>{refresh()})
    },
    methods: {
      //防抖函数
      debounce(func,delay) {
        let timer=null
        return function (...args) {
          if(timer) clearTimeout(timer)
          timer=setTimeout(() => {
            func.apply(this,...args)
          }, delay)
        }
      },
      
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        console.log('yes')
        this.$refs.scroll.scrollTo(0,0)
        
      },
      contentScroll(position) {
        // 返回顶部按钮的显示
        this.isShowBackTop = (-position.y) > 1000
        //tab-control的显示
        this.isShowTabControl=(-position.y)>this.offsetTopBar
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.refresh()
      },
      swiperImageLoad() {
          // console.log(this.$refs.tabControl.$el.offsetTop)
          this.offsetTopBar=this.$refs.tabControl.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    },
  
    activated() {
      // console.log("actived")
      // console.log(this.saveY)
      // this.$refs.scroll.scrollTo(0,this.saveY,0)
      // this.$refs.scroll.refresh()
      this.$refs.hSwiper.startTimer()
    },
    deactivated() {
      this.$refs.hSwiper.stopTimer()
      // this.saveY=this.$refs.scroll.getSaveY()
      // console.log("deactivated")
      
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }


  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabControl {
    position: relative;
    z-index: 9;
  }

 
</style>

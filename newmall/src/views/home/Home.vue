<template>
    <div id='home'>
        <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature/>
        <tab-control class="tab-control" :titles="['流行', '新款', '精选']"/>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import  HomeSwiper  from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature";
import TabControl from "components/content/tabcontrol/TabControl"

import { getHomeMultidata, getHomeGoods } from "network/home"
export default {
    name:'Home',
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    components:{NavBar,HomeSwiper,RecommendView,Feature,TabControl},
    created() {
        // console.log('created')
        getHomeMultidata().then((res)=>{
            // console.log(res)
            this.banners=res.data.banner.list
            this.recommends=res.data.recommend.list
            })
        

    }
}
</script>
<style scoped>
.home-nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    position: fixed; 
    /* 脱离了文档流 */
    top: 0;left: 0;right: 0;
    z-index: 3;
}
#home {
    padding-top:44px;
}
.tab-control {
    position:sticky;
    top: 44px;
}
</style>
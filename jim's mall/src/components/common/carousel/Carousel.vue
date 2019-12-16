<template>
    <div class="carousel">
            <el-carousel  height="270px" indicator-position="outside">
                <el-carousel-item v-for="item in img" :key="item">
                    <img class="carousel-img" :src="item" alt="">
                </el-carousel-item>
             </el-carousel>
    </div>
</template>

<script>
import Vue from "vue";
import {  Carousel,CarouselItem} from "element-ui";
Vue.use(Carousel)
Vue.use(CarouselItem)
export default {
    props:{
        img:{
            type:Array,
            defaulu() {
                return []
            }
        }
    }
}
</script>

<style scoped>
    .carousel-img {
        width: 100%;
        /* height:100px; */
    }
</style>
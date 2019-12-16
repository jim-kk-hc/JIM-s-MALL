<template>
    <div class="home-carousel">
        <el-carousel height="200px">
            <el-carousel-item  v-for="(item,index) in banners" :key="index">
                <a :href="item.link"></a>
                <img class="home-img" :src="item.image" @load="imageLoad">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import Carousel from "components/common/carousel/Carousel";

export default {
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad:false
      }
    },
    methods: {
      imageLoad() {
        if(!this.isLoad){
          this.$emit('sweiperImageLoad')
          this.isLoad=true
        }
      }
    },
    components:{Carousel},
}
</script>
<style scoped>
.home-img{
    width: 100%;
    height: 100%;
}
</style>
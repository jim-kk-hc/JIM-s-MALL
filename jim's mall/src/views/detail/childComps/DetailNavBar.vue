<template>
<nav-bar class="detail-nav" >
    <div slot="left" class="oleft" @click="back">
        <img src="~assets/img/common/back.svg">
        </div>
    <div class="ocenter" slot="center">
        <div v-for="(item,index) in titles" 
        :key="index" 
        class="odiv" 
        @click="navclick(index)"
        :class="{active:currentIndx===index}"
       
        >{{item}}</div>
    </div>
    <div slot="right"></div>
    </nav-bar>    
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
export default {
    data() {
        return {
            titles:["商品","参数","评论","推荐"],
            currentIndx:0
        }
    },
    components:{NavBar},
    methods:{
        navclick(index) {
            this.currentIndx=index
        },
        back() {
            this.$router.back()
        }
    }
}
</script>
<style scoped>
.detail-nav {
     /* background-color: black; */
     z-index: 1;
}
.ocenter {
    display:flex;
    font-size: 13px; 
}
.odiv {
    flex:1 0 auto;
}
.active {
    color:var(--color-high-text);
}
.oleft img {
    margin-top:12px;
}
</style>
<template>
    <div id="recommend">
        <div v-for="(item,index) in recommends" :key="index" class="allItem">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
            
        </div>
    </div>
</template>
<script>
export default {
    props : {
        recommends:{
            type:Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style  scoped>
#recommend {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
    text-align: center;
}
.allItem {
    flex: 0 1 2px;
}
.allItem img {
    width: 70px;
    height:70px;
    margin-bottom: 10px;
}
</style>
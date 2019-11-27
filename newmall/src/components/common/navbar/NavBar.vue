<template>
    <div id="navbar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name:'NavBar'
}
</script>

<style  scoped>
#navbar {
    height:50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
}
.left ,.right {
    flex: 0 1 60px;
    
}
.center {
 flex:1 1 auto
}
</style>
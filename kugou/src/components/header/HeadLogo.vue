<template>
    <div class="logo-container">
        <div class="head-logo">
            <a href="#">
                <img src="http://m.kugou.com/v3/static/images/index/logo.png">
            </a>
        </div>
        <div class="head-search" @click="gotoSearch">
            <img src="http://m.kugou.com/v3/static/images/index/search.png">
        </div>
    </div>
</template>

<script>
    export default {
        name:'HeadLogo',
        methods: {
            gotoSearch() {
                this.$store.commit('showDetailPlayer',false);
                this.$router.push({path: '/search'})
            }
        },
    }
</script>

<style  scoped>
.logo-container {
    height: 51px;
    width: 100%;
    background:#2CA2F9;
    padding: 10px;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1050;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head-logo {
    height: 100%;
}
.head-logo  img {
    height: 100%;
}
.head-search img {
    width: 25px;
    height: 25px;
    
}

</style>
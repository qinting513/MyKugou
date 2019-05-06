<template>
  <div class="header-nav">
        <mt-navbar v-model="headNav" class="container">
            <mt-tab-item id="head-nav1">新歌</mt-tab-item>
            <mt-tab-item id="head-nav2">排行</mt-tab-item>
            <mt-tab-item id="head-nav3">歌单</mt-tab-item>
            <mt-tab-item id="head-nav4">歌手</mt-tab-item>
        </mt-navbar>
   </div>
</template>

<script>
    export default {
        name:'HeadNav',
        computed: {
            headNav: {
                get() {
                    //  console.log('head nav:',this.$store.getters.headNav);
                    return this.$store.getters.headNav;
                },
                set(nav) {
                    // console.log('nav:',nav);
                    const index = nav.substr(-1);
                    this.$store.commit('setHeadNav', nav);
                    this.goRouter(Number(index));
                }
            }
        },
        methods: {
            goRouter(index) {
                switch (index) {
                    case 1: 
                    this.$router.push({path:'/'});
                    break;
                    case 2: 
                    this.$router.push({path:'/rank'});
                    break;
                    case 3: 
                    this.$router.push({path:'/songList'});
                    break;
                    case 4:
                    this.$router.push({path:'/singer'});
                    break;
                    default:
                    this.$router.push({path:'/'});
                }
            }
        }
    }
</script>

<style>
.header-nav{
    position: fixed;
    top: 51px;
    left: 0;
    width: 100%;
    z-index: 1000;
    height: 49px ;
    border-bottom: 1px solid #e4e4e4
}

 .mint-navbar {
     background: #fff;
     display: flex;
     height: 48px ;
     text-align: center;
 }

 .mint-navbar .mint-tab-item {
    flex: 1;
    padding: 0;
    color: black;
}
.mint-tab-item-label {
    font-size: 16px !important;
    line-height: 48px;
}

.mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0px  !important;
    border-bottom: 3px solid #26a2ff;
    color: #26a2ff;
}

</style>
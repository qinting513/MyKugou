<template>
    <div class="singerList">
       <mt-cell v-for="(item,index) in list" :key="index" is-link :title="item.singername"
       :to="`/singer/singerList/info/${item.singerid}`" >
          <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
       </mt-cell>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui'
    export default {
        name: 'SingerList',
        data() {
            return {
                list: []
            }
        },
        beforeRouteEnter(to, from, next) {
            next( vm => {
                vm.$store.commit('showHead', true)
                vm.$store.commit('setHeadStyle', {'background': '#2ca2f9'})
                vm.getList();
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('showHead', false);
            // this.$store.commit('resetHeadStyle');
            next();
        },
        methods: {
           getList() {
               Indicator.open({
                   text: '加载中...',
                   spinnerType: 'snake'
               });
               var singerId = this.$route.params.id;
               this.$http.get(`/proxy/singer/list/${singerId}?json=true`)
               .then( (response) => {
                   Indicator.close();
                   this.list = response.data.singers.list.info;
                   this.$store.commit('setHeadTitle', response.data.classname)
                   console.log('singerList response:', this.list);
               }).catch( (e) => {
                    Indicator.close();
                    console.log('singerList err:', e);
               })
           }
        },

    }
</script>

<style>
.singerList .mint-cell-wrapper{
    padding: 10px 5px;
    background-image: none;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
}
.singerList .mint-cell {
    padding-left: 10px;
    min-height: 52px
}
.singerList .mint-cell-title img {
    margin-right: 10px;
}
.mint-cell-title{
    padding-right: 10px;
}

</style>
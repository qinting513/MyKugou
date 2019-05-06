<template>  
    <div class="rank">
        <mt-cell v-for="(item, index) in songList" :key="index" :title="item.rankname"
        :to="`/rank/info/${item.rankid}`" is-link>
            <img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
        </mt-cell>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui'
    export default {
        name: 'Rank',
        data() {
            return {
                songList: []
            }
        },
        created() {
            this.getSongList();
        },
        methods: {
            getSongList() {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                this.$http.get('/proxy/rank/list&json=true')
                .then( (response) => {
                    Indicator.close();
                    this.songList = response.data.rank.list;
                     console.log('rank response:', this.songList[0]);
                }).catch( (e) => {
                    Indicator.close();
                    console.log('get rank err:', e);
                }) 
            }
        }
    }
</script>

<style>
.rank .mint-cell {
    /* 设置cell的左内边距 */
    padding-left: 10px;
}

.rank .mint-cell-wrapper {
    padding: 10px 5px;
    /* 将顶部到分割线去除 然后设置自己到分割线在bottom */
    background-image: none;
    border-bottom: 1px solid #e8e8e8;
    font-size: 16px !important;
}

.rank .mint-cell-title{
    padding-right: 10px;
}

.rank .mint-cell-title img {
    margin-right: 10px;
}



</style>
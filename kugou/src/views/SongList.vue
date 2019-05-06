<template>
    <div class="songList">
         <mt-cell v-for="(item, index) in list" :key="index"
        :title="item.specialname" is-link :label="String(item.playcount)"
        :to="`/songList/info/${item.specialid}`" >
            <img slot='icon' :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
         </mt-cell>
    </div>
</template>

<script>
     import { Indicator } from 'mint-ui'
    export default {
        name: 'SongList',
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                this.$http.get('/proxy/plist/index&json=true')
                .then( (response) => {
                    Indicator.close();
                    this.list = response.data.plist.list.info;
                    console.log('SongList response:', this.list[0]);
                }).catch( (e) => {
                    Indicator.close();
                    console.log('SongList get rank err:', e);
                }) 
            }
        }
    }
</script>

<style>

.songList .mint-cell-wrapper{
    padding: 10px 5px;
    background-image: none;
    border-bottom: 1px solid #e4e4e4;
    font-size: 16px;
}
.songList .mint-cell {
    padding-left: 10px;
}

/* 标题 */
.songList .mint-cell-text {
    padding-left: 0;
    position: absolute;
    left: 90px;
    top: 23px;
    padding-right: 40px;
    line-height: 16px;
    height: 16px;
    overflow: hidden;
}
/* 点击量 */
.songList .mint-cell-label {
    position: absolute;
    left: 90px;
    top: 38px;
}
.songList .mint-cell-label:before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('../assets/images/icon_music.png') no-repeat center;
    background-size: 100%;
}

</style>
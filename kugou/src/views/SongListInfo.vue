<template>
    <div class="song-list">
        <div class="song-list-banner-wrap" 
        :style="{background:`url( ${imgurl} )`}">
        </div>

        <div class="song-list-desp container">
             <p class="song-list-desp-p" :class="{'song-list-desp-hide':hideDesp}">{{desp}}</p>
             <img src="../assets/images/close_icon.png" @click="toggleDesp" class="song-list-desp-icon" v-if="hideDesp">
             <img src="../assets/images/open_icon.png" @click="toggleDesp" class="song-list-desp-icon" v-else>
        </div>
        <div class="song-list-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>
        <div class="song-list-cell">
             <mt-cell v-for="(item, index) in songList" :key="index" :title="item.filename"
             @click.native="playAudio(index)">
                 <img src="../assets/images/download_icon.png" width="16" height="16">
             </mt-cell>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui'
	import { PLAY_AUDIO } from '../mixins'
    export default {
        name:'songListInfo',
        mixins:[PLAY_AUDIO],
        data() {
            return {
                 imgurl: '',
                 title: '',
                 songList: [],
                 updateTime: '',
                 desp: '',
                 hideDesp: false,
                 opacity: 0,
            }
        },
        //通过路由的before钩子解除router-view缓存限制
        beforeRouteEnter(to, from ,next) {
            next( vm => {
                vm.$store.commit('showHead', true)
                vm.getList()
                window.onscroll = () => {
                    vm.opacity = window.pageYOffset / 250
                    vm.$store.commit('setHeadStyle', {background: `rgba(43, 162, 251, ${vm.opacity})`})
                }
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('showHead', false)
            this.$store.commit('resetHeadStyle')
            window.onscroll = null
            next()
        },
        methods: {
            toggleDesp() {
                this.hideDesp = !this.hideDesp;
            },
            getList() {
                Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
                });     
                var infoID = this.$route.params.id;
                this.$http.get(`/proxy/plist/list/${infoID}?json=true`)
                .then( (response) => {
                    Indicator.close();
                    // console.log('songList info response:', response);
                    // 顶部数据
                    const info = response.data.info.list;
                    // 底部数据
                    this.songList = response.data.list.list.info;
                    this.imgurl = info.imgurl.replace('{size}', '400');
                    this.desp = info.intro;
                    this.$store.commit('setHeadTitle', info.specialname)
                }).catch( (e) => {
                    Indicator.close();
                    console.log('songList info error:', e);
                })
            }
        },
    }
</script>

<style >

.song-list .song-list-banner-wrap {
    width: 100%;
    height: 200px;
    margin-top: -51px;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
}
.song-list .song-list-desp {
    width: 100%;
    font-size: 16px;
    position: relative;
    text-align: justify;
    padding: 12px;
}
.song-list .song-list-desp-p {
    padding-right: 40px;
    line-height: 135%; 
}
.song-list .song-list-desp-hide {
    overflow: hidden;
    height: 23px;
}
.song-list .song-list-desp-icon {
    display: block;
    width: 22px;
    height: 22px;
    position: absolute;
    right: 10px;
    top: 12px;
}
</style>
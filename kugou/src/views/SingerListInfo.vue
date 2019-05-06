<template>
    <div class="singer-list-info-content ">
        <div class="singer-list-info-banner-wrap" :style="{'backgroundImage':`url(${imgurl})`}"></div>

        <div class="singer-list-info-desp container">
            <p class="singer-list-info-p" :class="{'singer-list-info-hide': hideDesc}">{{desc}}</p>
            <img src="../assets/images/close_icon.png" @click="toggleDesc" class="singer-list-info-desp-icon" v-if="hideDesc">
            <img src="../assets/images/open_icon.png" @click="toggleDesc" class="singer-list-info-desp-icon" v-else>
        </div>
        <div class="singer-list-info-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>
        <div class="singer-list-info-cell">
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
        name:'singerListInfo',
        mixins: [PLAY_AUDIO],
        data() {
            return {
                 imgurl: '',
                 songList: [],
                 updateTime: '',
                 desc: '',
                 hideDesc: true,
                 opacity: 0
            }
        },
        beforeRouteEnter(to, from, next) {
            next( vm => {
                vm.$store.commit('showHead', true)
                vm.$store.commit('resetHeadStyle')
                vm.getList();
                window.onscroll = () => {
                    vm.opacity = window.pageYOffset / 250
                    vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
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
            getList() {
                 Indicator.open({
                     text: '加载中...',
                     spinnerType: 'snake'
                 });
                 var infoID = this.$route.params.id;
                 this.$http.get(`/proxy/singer/info/${infoID}&json=true`)
                 .then( (response) => {
                     Indicator.close()
                     console.log('singList Info response:', response)
                     const { info, songs} = response.data;
                     this.imgurl = info.imgurl.replace('{size}', '400');
                     this.desc = info.intro;
                     this.songList = songs.list;
                     this.$store.commit('setHeadTitle', info.singername)
                 })
                 .catch( (e) => {
                      Indicator.close()
                     console.log('singList Info err:', e)
                 })
            },
            toggleDesc() {
                this.hideDesc = !this.hideDesc;
            }
        },
    }
</script>

<style>
.singer-list-info-content .singer-list-info-banner-wrap {
    width: 100%;
    height: 200px;
    margin-top: -51px;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
}
.singer-list-info-content .singer-list-info-desp {
    padding: 12px;
    width: 100%;
    font-size: 16px;
    position: relative;
    text-align: justify;
}
.singer-list-info-content .singer-list-info-p {
   margin-right: 40px;
   line-height: 135%;
}
.singer-list-info-content .singer-list-info-hide {
    overflow: hidden;
    height: 23px;
}
.singer-list-info-content .singer-list-info-desp-icon {
    display: block;
    position: absolute;
    top: 8px;
    right: 10px;
    width: 22px;
    height: 22px;
}
/* .singer-list-info-cell {
    padding-left: 10px;
} */
</style>
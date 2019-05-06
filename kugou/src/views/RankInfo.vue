<template>
    <div class="rankInfo-content">

         <div class="rank-banner-wrap"
         :style="{backgroundImage:'url(' + imgurl + ')'}">
              <div class="rank-status container">
                  <p>上次更新时间:{{getToady()}}</p>
              </div>
         </div>

         <div class="rank-info-list">
              <mt-cell v-for="(item, index) in songList" :key="index"
              :title="item.filename" @click.native="playAudio(index)" >
                 <span class="rank-index" :class="{'rank-list-good': index<3, 'rank-list-first': index==0, 
                 'rank-list-second' : index==1, 'rank-list-third' : index==2}">{{index + 1}}</span>
                 <img src="../assets/images/download_icon.png" width="16" height="16">
              </mt-cell>
         </div>

    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { PLAY_AUDIO } from '../mixins'
    export default {
        name:'RankInfo',
        mixins: [PLAY_AUDIO],
        data() {
            return {
                imgurl: '',
                songList: [],
                updateTime: '',
                opacity: 0
            }
        },
        //通过路由的before钩子解除router-view缓存限制
        beforeRouteEnter(to, from ,next) {
            next( vm => {
                vm.$store.commit('showHead', true)
                vm.getList()
                window.onscroll = () => {
                    vm.opacity = window.pageYOffset / 250
                    vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
				}
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('showHead', false)
            // 每次离开都重置一下透明度
            this.$store.commit('resetHeadStyle')
            window.onscroll = null
            next()
        },
        mounted() {
            window.onscroll = () => {
                this.opacity = window.pageYOffset / 200
                this.$store.commit('setHeadStyle', {background: `rgba(43, 162, 251, ${this.opacity})`})
            }
        },
        methods: {
            getToady() {
                const time = new Date()
                const year = time.getFullYear()
                var month = time.getMonth() + 1
                var date = time.getDate()
                if (month < 10) {
                    month = '0' + month
                }
                if (date < 10) {
                    date = '0' + date
                }
                return `${year}-${month}-${date}`
            },
            getList() {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                })
                var infoID = this.$route.params.id;
                this.$http.get(`/proxy/rank/info/?rankid=${infoID}&page=1&json=true`)
                .then( (response) => {
                    Indicator.close()
                    console.log('rankInfo response:', response);
                    const {info, songs} = response.data
                    const {banner7url,rankname} = info
                    const {list} = songs
                    this.imgurl = banner7url.replace('{size}', '400')
                    this.songList = list
                    this.$store.commit('setHeadTitle', rankname)
                }).catch( (e)=>{
                    Indicator.close()
                    console.log('rankInfo error:', e);
                })
            }
        },

    }
</script>

<style>
.rankInfo-content {

}
.rank-banner-wrap {
    width: 100%;
    height: 200px;
    margin-top: -51px;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
}
.rank-status {
    height: 43px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),rgba(0,0,0,0));
    line-height: 43px;
    font-size: 15px;
    color: #fff;
}

.rank-info-list .mint-cell {
    /* 设置cell的左内边距 */
    padding-left: 10px;
}

.rank-info-list .mint-cell-text{
    margin-left: 10px;
    margin-right: 20px;
}

.rank-info-list .rank-index {
    position: absolute;
    left: 20px;
    font-size: 14px;
    
}

.rank-list-good {
    display: inline-block;
    padding: 2px 8px;
    left: 12px !important;
    border-radius: 8px;
    color: #fff;
    margin-top: 3px !important;
}
.rank-list-first {
		background-color: #E80000;
	}
	
.rank-list-second {
    background-color: #FF7200;
}
	
.rank-list-third {
    background-color: #F8B300;
}
    
</style>
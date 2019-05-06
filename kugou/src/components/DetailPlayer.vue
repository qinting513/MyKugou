<template>
    <div v-show="detailPlayerFlag">

         <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
         <div class="detail_player"
         :style="{backgroundImage:`url(${audio.imgUrl})`, filter:'blur(5px)', 
         '-webkit-filter':'blur(5px)'}"></div>
     
         <div class="detail_player_content">
                 <!-- 标题栏 -->
                <div class="detail_player_title container">
                    <span class="detail_player_back" @click="hideDetailPlayer()"></span>
                    {{audio.title}}
                </div>
               <!-- 图片 -->
                <div class="detail_player_img">
                    <img :src="audio.imgUrl">
                </div>
                <!-- 歌词部分 -->
                <div class="detail_player_lrc">
                    <div class="lrc-content" :style="{marginTop: lrcOffset + 'px'}">
                        <p v-for="(item, index) in songLrc" :key="index" 
                        :class="{isCurrentLrc: item.seconds >= audio.currentLength}">{{item.lrcContent}}</p>
                    </div>
                </div>
                <div class="detail_player_range container">
                    <!-- 当前播放进度 -->
                    <!-- 歌词 经过过滤器过滤 time -->
                    <span class="detail_player_time">{{audio.currentLength | time}}</span>
                    <!-- input事件会一直触发 所以禁用range 改为onclick -->
                    <mt-range
                        id="range"
                        :min="0"
                        :max="audio.songLength"
                        v-model="audio.currentLength"
                        :bar-height="3"
                        style="width:80%" 
                        disabled
                        @click.native="rangeChange($event)"
                    ></mt-range>
                    <!-- 总长 -->
                    <span class="detail_player_time total_time">{{audio.songLength | time}}</span>
                </div>

                <!-- 控制部分 -->
                <div class="detail_player_control player_padding">
                    <div class="detail_player_btn play_prev player_btn-sm" @click="prev()"></div>
                    <div class="detail_player_btn play_play player_btn-lg" :class="{'play_pause':isPlay}" @click="toggleStatus()"></div>
                    <div class="detail_player_btn play_next player_btn-sm" @click="next()"></div>
                </div>
         </div>
        
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: 'DetailPlayer',
        data() {
            return {
                rangeValue: 0
            }
        },
        filters: {
            // 处理播放时长的过滤器
            time(value) {
                var length = Math.floor(parseInt(value))
                var minute = Math.floor(value / 60)
                if (minute < 10) {
                    minute = "0" + minute;
                }
                var second = length % 60;
                if (second < 10) {
                    second = '0' + second;
                }
                return minute + ':' + second;
            }
        },
        /** 
         * 1.computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，
             然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
           2.computed比较适合对多个变量或者对象进行处理后返回一个结果值，也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化，
             举例：购物车里面的商品列表和总金额之间的关系，只要商品列表里面的商品数量发生变化，或减少或增多或删除商品，总金额都应该发生变化。
             这里的这个总金额使用computed属性来进行计算是最好的选择
             watch主要用于监控vue实例的变化，它监控的变量当然必须在data里面声明才可以，它可以监控一个变量，也可以是一个对象
             watch一般用于监控路由、input输入框的值特殊处理等等，它比较适合的场景是一个数据影响多个数据
         * */ 
        computed: {
           ...mapGetters(['audio', 'detailPlayerFlag', 'isPlay']),
           songLrc() {
               if (this.audio.lrc) {
                   var temp = this.audio.lrc.split('\r\n')
                   temp = temp.splice(0, temp.length - 1)
                   temp = temp.map( (value) => {
                       var time = value.substr(1, 5)
                       var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
                       var lrcContent = value.substr(10)
                       return {
                           seconds, lrcContent
                       }
                   })
                   console.log('songLrc:', this.audio);
                   return temp;
               }
           },
           lrcOffset() {
              if (this.songLrc) {
                  var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-20)
                  return this.audio.currentLength + offset - this.audio.currentLength
              }    
           }
        },
        methods: {
            hideDetailPlayer() {
                this.$store.commit('showDetailPlayer', false)
            },
            // 滑动播放
            rangeChange(event) {
                var offset = event.offsetX;
                var rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20;
                var clickLength = Math.floor(offset * this.audio.songLength / rangeWidth)
                if (offset < rangeWidth) {
                    this.$store.commit('setAudioTime', clickLength);
                    this.$store.commit('setCurrent', true)
                }
            },
            toggleStatus() {
                if (this.isPlay) {
                    document.getElementById('audioPlay').pause();
                } else {
                    document.getElementById('audioPlay').play();
                }
                this.$store.commit('isPlay', !this.isPlay)
            },
            prev() {
                this.$store.dispatch('prev');
            },
            next() {
                this.$store.dispatch('next');
            }
        },
    }
</script>

<style>
.detail_player {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   z-index: 1010;
   background-position: center;
   background-size: cover;
   background-repeat: no-repeat;
   background-color: #aaa;
}
/* 标题栏 */
.detail_player_content  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1010;
}
.detail_player_title {
    width: 100%;
    height: 43px;
    font-size: 18px;
    text-align: center;
    color: white;
    line-height: 43px;
    margin-top: 51px;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
    position: relative;
}
/* 返回按钮 */
.detail_player_back {
    display: block;
    float: left;
    width: 24px;
    height: 100%;
    background: url("../assets/images/goback_icon.png") no-repeat center;
    background-size: 60% 60%;
    position: absolute;
    left: 10px;
    top: 0;
}
.detail_player_img {
    width: 50%;
    margin: 30px auto;
}
.detail_player_img img{
    width: 100%;
}
.detail_player_lrc {
    width: 100%;
    height: 60px;
    overflow: hidden;
    margin-bottom: 20px;
    text-align: center;
    color: #fff;
    line-height: 20px;
}
.mt-range-thumb{
    width: 16px;
    height: 16px;
    top:7px;
}
.detail_player_time {
    display: block;
    width: 10%;
    height: 30px;
    float: left;
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    text-align: center;
}
.total_time {
    float: right;
    margin-top: -30px;
}

.detail_player_control {
    margin-top: 10px;
    background: red;
}
.player_padding {
    padding: 0 20%;
}
.detail_player_btn {
  display: block;
  width: 33.3%;
  height: 100px;
  float: left;
}
.play_prev {
    background: url('../assets/images/play_prev.png') no-repeat;
    background-size: 60% auto;
    background-position: center;
}
.play_play {
    background: url('../assets/images/play_play.png') no-repeat;
    background-size: 80% auto;
    background-position: center;
}
.play_pause {
    background: url('../assets/images/play_pause.png') no-repeat;
    background-size: 80% auto;
    background-position: center;
}
.play_next {
    background: url('../assets/images/play_next.png') no-repeat;
    background-size: 60% auto;
    background-position: center;
}

</style>
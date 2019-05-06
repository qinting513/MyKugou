<template>
    <div id="newsong">
        <mt-swipe :auto="4000" ref="swipeWrapper">
            <mt-swipe-item class="item" v-for="(banner, index) in banners" :key="index">
                <a :href="banner.extra.tourl">
                    <img :src="banner.imgurl" :title="banner.title">
                </a>
        </mt-swipe-item>
      </mt-swipe>

      <mt-cell v-for="(song, index) in songList" :key="index" 
      :title="song.filename" @click.native="playAudio(index)">
           <img src="../assets/images/download_icon.png" width="16" height="16">
      </mt-cell>
</div>
</template>
<script>
    import { Indicator } from 'mint-ui';
    import {PLAY_AUDIO} from '../mixins'
    export default {
        name: 'newSong',
        mixins: [PLAY_AUDIO],
        data() {
            return {
                banners: [],
                songList: []
            }
        },
        created() {
            this.getSong();
        },
        methods: {
            getSong() {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                this.$http.get('/proxy/?json=true')
                .then((response) => {
                    this.banners = response.data.banner;
                    this.songList = response.data.data;
                    console.log('newsong data:', this.songList);
                }).then( () => {
                    Indicator.close();
                }).catch( (e) => {
                    Indicator.close();
                    console.log('newsong error:', e);
                });
            }
        }
    }
</script>

<!--
遇到的坑
1.轮播图是竖向的
忘记引入样式文件了import "mint-ui/lib/style.css"
2.轮播图不显示
需要在swipe所在组件的style中设定swipe容器的宽高 
3.假如我们一个固定300px高度div对象，如果要让其文字内容上下垂直居中，我们即可使用line-height:300px即可。
-->
<style>
@import "mint-ui/lib/style.css";
    #newsong{
        width: 100%;
        height: 100%;
    }
  	.mint-swipe {
		height: 39vw !important;
	}
	
	.mint-swipe-indicator {
		width: 8px !important;
		height: 8px !important;
        background: red;
        opacity: 1;
	}
    .mint-swipe-indicator.is-active {
        background: white;
    }
	
	.mint-swipe-indicators {
		bottom: 5px !important;
	}
    .mint-cell-wrapper {
        width: 100%;
    }
    /* 说明：
    1、宽度一定要设置，可以根据实际需求调整。
    2、white-space:nowrap是禁止文字折行。
    3、text-overflow表示当文本溢出时是否显示省略标记，有两个值：
    clip：不显示省略标记（...），而是简单的裁切。
    ellipsis：当对象内文本溢出时显示省略标记（...） */
    .mint-cell-title {
        width: 60%;
        white-space:nowrap; 
        overflow:hidden; 
        text-overflow:ellipsis;
    }
    .mint-cell-text {
       padding-left: 10px;
       font-size: 14px;
    }

</style>
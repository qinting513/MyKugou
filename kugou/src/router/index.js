import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/newSongs',
      components: require('../views/NewSong.vue'),
      alias:'/'
    },
    {
      path: '/search',
      components: require('../views/Search.vue')
    },
    {
      path: '/rank',
      components: require('../views/Rank.vue')
    },
    {
      path: '/rank/info/:id',
      components: require('../views/RankInfo.vue')
    },
    {
      path: '/songList',
      components: require('../views/SongList.vue')
    },
    {
      path: '/songList/info/:id',
      components: require('../views/SongListInfo.vue')
    },
    {
      path: '/singer',
      components: require('../views/Singer.vue')
    },
    {
      path: '/singer/singerList/:id',
      components: require('../views/SingerList.vue')
    },
    {
      path: '/singer/singerList/info/:id',
      components: require('../views/SingerListInfo.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

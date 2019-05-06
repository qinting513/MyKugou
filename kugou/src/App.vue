<template>
  <div id="app">
    <HeadView />
     <div class="main">
        <router-view></router-view>
    </div>
    <Player />
    <DetailPlayer />
  </div>
</template>

<script>
import HeadView from './components/header/HeadView'
import Player from './components/Player'
import DetailPlayer from './components/DetailPlayer'
export default {
  name: 'App',
  components: {
     HeadView, Player, DetailPlayer
  },
}
</script>

<style>

#app {
  width: 100%;
  height: 100%;
  color: #000;
}
.main {
  margin-top: 100px;
}
</style>

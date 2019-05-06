<template>
    <div class="header">
        <head-logo></head-logo>
        <rank-head v-if="head.toggle" :title="head.title" :cStyle="head.style"></rank-head>
        <head-nav v-else></head-nav>
    </div>
</template>

<script>
 import HeadLogo from './HeadLogo.vue'
 import HeadNav from './HeadNav.vue'
 import RankHead from './RankHead.vue'
 import {mapGetters} from 'vuex'

    export default {
        name: 'HeadView',
        computed: {
            ...mapGetters(['head'])
        },
        components: { HeadLogo, HeadNav, RankHead }
    }
</script>

<style>

</style>
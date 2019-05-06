<template>
    <div class="rank-head container" :style="cStyle" id="transparent-header">
         <a class="rank-head-back" @click="routerBack"></a>
         {{title}}
    </div>
</template>

<script>
    export default {
        name:'RankHead',
        props:['title', 'cStyle', 'to'],
        methods: {
            routerBack() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style>
   .container {
       padding: 0 10px;
       width: 100%;
       overflow: hidden;
   }
   .rank-head {
       width: 100%;
       height: 43px;
       line-height: 43px;
       position: fixed;
       background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
       top: 51px;
       z-index: 999;
       color: #fff;
       font-size: 18px;
       text-align: center;
   }
   .rank-head-back {
       display: block;
       float: left;
       position: absolute;
       left: 5px;
       top: 0;
       width: 24px;
       height: 100%;
       background: url('../../assets/images/goback_icon.png') no-repeat center;
       background-size: 60% 60%;
   }

</style>
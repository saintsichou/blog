<template>
  <div id='box'>
    <lheader/>
    <transition name="page">
      <nuxt />
    </transition>
    <personalinfo></personalinfo>
    <footers />
    <!-- <div :class="['maskall',this.bol?'ismaskallshow':'']">
      <loadsvg class="load_logo"></loadsvg>
    </div> -->
  </div>
</template>

<script>
import lheader from '~/components/Header';
import footers from '~/components/Footers';
import personalinfo from '~/components/personalinfo';
// import loadsvg from '~/components/Svgs/loadsvg';

import { mapState } from 'vuex'

export default {
  name: 'App',
  data(){
    return {
      bol:false
    }
  },
  components: {
    lheader,
    footers,
    personalinfo,
    // loadsvg,
  },
  computed: {
    ...mapState(['menuStatus'])
  },
  created(){
    // setTimeout(() => {
    //   this.bol=true
    // }, 10000);
  },
  mounted(){
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    // })
  },
  methods: {
    _closeMenu () {
      this.$store.commit('UPDATE_MENU_STATUS', false)
    }
  }
}
</script>



<style lang="less" scoped>
.maskall{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 99;
    top: 0;
    background: #fff;
    .load_logo{
      position: absolute;
      top:0;
      left:0;
      right: 0;
      bottom: 0;
      margin: auto
    }
}
.ismaskallshow{
  display: none
}
</style>

<template>
  <div>
    <lheader/>
    <transition name="page">
      <nuxt />
    </transition>
    <footers />
  </div>
</template>

<script>
import lheader from '~/components/Header';
import footers from '~/components/Footers';
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    lheader,
    footers
  },
  computed: {
    ...mapState(['menuStatus'])
  },
  methods: {
    _closeMenu () {
      this.$store.commit('UPDATE_MENU_STATUS', false)
    }
  }
}
</script>



<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #fff;
	/* font: 14px play,PingFangSC-Regular,Microsoft Yahei; */
	line-height: 1.5;
	color: #666;
  font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  
}
body{
  height: 100vh;
  /* background: url(http://gdp.alicdn.com/imgextra/i2/453276963/TB2cBTft7OWBuNjSsppXXXPgpXa_!!453276963.jpg) no-repeat center;
  background-size: cover; */
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<template>
  <footer :class="['footer']">
    <div class="wrap">
      <div class="copyright">
        <div class="left">
          <!-- 版权文字 -->
          <div class="copyright-text" v-html="copyright"></div>
        </div>
        <p class="right">Theme by <a href="http://www.liyichuan.top">liyichuan</a></p>
      </div>
    </div>
    <div class="back-top" ref="backTop" @click="backTop" :class="{ show: isShowBackTop }">
      <!-- <x-icon class="icon-back-top"></x-icon> -->
    </div>
    <a-back-top>
      <div class="ant-back-top-inner">up</div>
    </a-back-top>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Footers',
  data () {
    return {
      isShowBackTop: false
    }
  },
  computed: {
    ...mapState(['menuStatus', 'links', 'subMenu', 'errorInformation']),
    ...mapState({
      copyright: state => state.info.copyright
    })
  },
  mounted () {
    let self = this
    window.addEventListener('scroll', function () {
      self.isShowBackTop = this.scrollY > 300
    })
  },
  methods: {
    backTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="less" scoped>
.footer {
  padding: 30px 0;
  color:#fff;
  background: @color-theme;
  transition: .5s;
  .copyright-text{
    text-align: center;
  }
  .ant-back-top-inner{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 33px;
    font-size: 25px;
    border-radius: 50%;
    color:#fff;
    background: @color-theme;
  }
  .right{
    width: 100%;
    margin-top:10px;
    text-align: center;
  }
}
@media screen and (max-width:767px) {
  .footer{
    font-size: 12px;
  }
}
</style>

<template>
    <div :class="['leftbox',isBounceTop && 'bonce']">
      <!-- 分享开始 -->
      <div class="share">
        <a :href="`tencent://message/?uin=328891723&Site=Sambow&Menu=yes`" target="_blank" class="qq">
          <qqshare></qqshare>
        </a>
      </div>
      <div class='wechat'>
          <div id='code'>
            <img
              width="80"
              alt="logo"
              :src="this.info.wechatpay"
            />
          </div>
          <wechart></wechart>
      </div>
      <div class="share">
        <a :href="`https://github.com/saintsichou/blog`" target="_blank" class="qq">
          <github></github>
        </a>
      </div>
      <!-- 分享结束 -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import qq from '~/components/Svgs/qq'
import qqshare from '~/components/Svgs/qq'
import weibo from '~/components/Svgs/weibo'
import zone from '~/components/Svgs/zone'
import shang from '~/components/Svgs/shang'
import github from '~/components/Svgs/git'
import alipay from '~/components/Svgs/alipay'
import wechart from '~/components/Svgs/wechat'

export default {
  components:{
    qqshare,weibo,zone,shang,github,alipay,wechart
  },
  computed: {
    ...mapState(['info']),
    ...mapState('article', ['detail'])


  },
  data(){
    return {
      QRCodeUrl:'',
      ishowqr:false,
      isBounceTop:false
    }
  },
  mounted () {
    // text: this.info.rewardText,
    //   alipay: this.info.alipay,
    //   wechatpay: this.info.wechatpay
    let self = this
    window.addEventListener('scroll', function () {
      self.isBounceTop = this.scrollY < 950
    })
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .leftbox{
    position: fixed;
    top:35%;
    left:5px;
    display: none;
    .share{
      width: 100%;
      height: 100%;
      margin-bottom: 5px;

    } 
  }
  .wechat{
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    margin-bottom: 5px;
    #code{
      position: absolute;
      top: -35px;
      right: -85px;
      display: none;
      background: transparent;
    }
  }
  .wechat:hover{
    #code{
      display: block
    }
  }
  .bonce{
    -webkit-animation: identifier 1800ms ease-out;
    -moz-animation: identifier 1800ms ease-out;
    -o-animation: identifier 1800ms ease-out;
    animation: identifier 1800ms ease-out;
    display: block;
      // animation: identifier 3s infinite;
  }
  @media screen and (max-width: 767px){
    .opinion {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        .list{
            margin: 0;
        }
    }
  }
  @keyframes identifier {
    0% {
      -webkit-transform:translateY(-100%);
      opacity: 0;
    }
    5% {
        -webkit-transform:translateY(-100%);
      opacity: 0;
    }
    15% {
        -webkit-transform:translateY(0);
      padding-bottom: 5px;
    }
    30% {
        -webkit-transform:translateY(-50%);
    }
    40% {
        -webkit-transform:translateY(0%);
      padding-bottom: 6px;
    }
    50% {
        -webkit-transform:translateY(-30%);
    }
    70% {
        -webkit-transform:translateY(0%);
      padding-bottom: 7px;
    }
    80% {
        -webkit-transform:translateY(-15%);
    }
    90% {
        -webkit-transform:translateY(0%);
        padding-bottom: 8px;
    }
    95% {
        -webkit-transform:translateY(-10%);
    }
    97% {
        -webkit-transform:translateY(0%);
        padding-bottom: 9px;
    }
    99% {
        -webkit-transform:translateY(-5%);
    }
    100% {
        -webkit-transform:translateY(0);
        padding-bottom: 9px;
      opacity: 1;
    }
  }
</style>
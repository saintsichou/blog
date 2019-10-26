<template>
    <div class="section operation">
      <!-- 点赞开始 -->
      <ul class="opinion">
        <li class="list" v-for="(item, key) in opinion" :key="key" @click="_updateOpinion(key)">
          <span class="block total">
            <a-icon type="loading" v-show="item.isShowLaoding" /> {{ item.data }}人
          </span>
          <img :src="item.src" width="40" height="40" alt="">
          <span class="block">{{ item.text }}</span>
        </li>
      </ul>
      <!-- 点赞结束 -->

      <!-- 分享开始 -->
      <div class="share text-left">
        <span class="text">分享到：</span>
        <a :href="`https://connect.qq.com/widget/shareqq/index.html?url=${info.domain}/details/${$route.params.id}&title=${detail.title.rendered}&summary=`" target="_blank">
          <qqshare></qqshare>
        </a>
        <a :href="`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${info.domain}/details/${$route.params.id}&title=${detail.title.rendered}&summary=${detail.articleInfor.summary}`" target="_blank">
          <zone></zone>
        </a>
        <a :href="`https://service.weibo.com/share/share.php?url=${info.domain}/details/${$route.params.id}%230-tsina-1-21107-397232819ff9a47a7b7e80a40613cfe1&title=${detail.title.rendered}&appkey=1343713053&searchPic=true#_loginLayer_1473259217614`" target="_blank">
          <weibo></weibo>
        </a>
        <span class='wechat'>
          <div id='code'>
            <img
              width="60"
              alt="logo"
              :src="this.QRCodeUrl"
            />
          </div>
          <wechat></wechat>
        </span>
        <!-- <a href="javascript:;" class="create-poster-btn" @click="isShowPoster = true">
          <svg-icon iconName="#icon-shengchengerweima"></svg-icon>
        </a> -->
      </div>
      <!-- 分享结束 -->

      <!-- 标签开始 -->
      <div class="tag-wrap text-center">
        <a-icon type="tags" />
        <span v-for="(item, index) in detail.articleInfor.tags" :key="item.key" v-html="index === detail.articleInfor.tags.length - 1 ? item.name : `${item.name}、`"></span>
      </div>
      <!-- 标签结束 -->

      <!-- 切换上下一篇文章 -->
      <div class="relative-link-wrap">
        <div class="prev">
          <p v-if="detail.articleInfor.prevLink === ''">已是第一篇文章！</p>
          <p v-else>上一篇：<nuxt-link :to="{ name: 'details-id', params: { id: detail.articleInfor.prevLink.ID } }">{{ detail.articleInfor.prevLink.post_title }}</nuxt-link></p>
        </div>
        <div class="next">
          <p v-if="detail.articleInfor.nextLink === ''">已是最后一篇文章！</p>
          <p v-else>下一篇：<nuxt-link :to="{ name: 'details-id', params: { id: detail.articleInfor.nextLink.ID } }">{{ detail.articleInfor.nextLink.post_title }}</nuxt-link></p>
        </div>
      </div>
      <!-- 切换结束 -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import QRCode from 'qrcode'
import qq from '~/components/Svgs/qq'
import qqshare from '~/components/Svgs/qqshare'
import weibo from '~/components/Svgs/weibo'
import zone from '~/components/Svgs/zone'
import wechat from '~/components/Svgs/wechat'

export default {
  components:{
    qqshare,weibo,zone,wechat
  },
   computed: {
    ...mapState(['info']),
    ...mapState('article', ['detail', 'viewCount', 'opinion'])
  },
  data(){
    return {
      QRCodeUrl:'',
      ishowqr:false
    }
  },
  mounted () {
    this.createQR(window.location.href)
  },
  methods: {
    ...mapActions('article', ['updateOpinion']),
    // 发表意见
    async _updateOpinion (key) {
      if (localStorage.getItem(`xm_link_${this.$route.params.id}`)) {
        this.$message.info(
          '您已经发表过意见了！'
         )
      } else {
        this.$store.commit('article/UPDATE_OPINION_LOADING', {
          key,
          flag: true
        })
        await this.updateOpinion({
          id: this.$route.params.id,
          key
        })
        this.$store.commit('article/UPDATE_OPINION_LOADING', {
          key,
          flag: false
        })
        localStorage.setItem(`xm_link_${this.$route.params.id}`, true)
      }
    },
    createQR (text) {
      try {
        QRCode.toDataURL(text).then(res=>{
          this.QRCodeUrl= res
        })
      } catch (error) {
        console.warn(`[createQRcode]: ${error}`)
        this.$message.error(error)
      }
    },
  }
}
</script>
<style lang="less" scoped>
  .opinion{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-bottom: 20px;
    text-align: center;
    .list{
      width: 50px;
      margin: 0 20px;
      cursor: pointer;
    }
    .share {
      margin-bottom: 20px;
    }
  }
  .wechat{
    position: relative;
    cursor: pointer;
    #code{
      position: absolute;
      top: -69px;
      right: -19px;
      display: none;
      background: transparent;
    }
  }
  .wechat:hover{
    #code{
      display: block
    }
  }
  .tag-wrap,.relative-link-wrap{
    margin-top:15px;
  }
  .relative-link-wrap{
    display:flex;
  }
  .prev,.next{
    flex:1;
    font-size: @font-size-large;
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
  
</style>
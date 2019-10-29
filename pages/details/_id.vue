<template>
  <section class="container_ph">
    <div class="bgbox"> 
      <div class="at_box2 section">
        <!-- 文章内容开始 -->
        <h1 class="title text-center" v-html="detail.title.rendered"></h1>
        <div class="other-info">
          <p>
            <span class="author">
              <a-icon type="smile" />{{ detail.articleInfor.author }}
            </span>
            <time class="time m-l-5px">
              <a-icon type="calendar" />{{ detail.date }}
            </time>
          </p>
          <p>
            <span class="text m-l-10px">分类：</span>
            <span
              class="classify"
              v-for="(item, index) in detail.articleInfor.classify"
              :key="item.key"
              v-html="index === detail.articleInfor.classify.length - 1 ? item.name : `${item.name}、`">
            </span>
            <span class="m-l-5px">
              <a-icon type="fire" />{{ viewCount }}
            </span>
            <span class="m-l-5px">
              <a-icon type="message" />{{ detail.articleInfor.commentCount }}
            </span>
          </p>
        </div>
        <div class="content-details" ref="articleContent" v-html="detail.content.rendered"></div>
        <div v-if="info.isOpenArticleCopyright" class="section copyright">
          <p><strong>版权声明: </strong> 本站文章除特别声明外，均为本站原创。转载请注明出处，谢谢。</p>
          <!-- <p class="m-t-10px"><strong>本文地址: </strong><a :href="fullPath">{{ fullPath }}</a></p> -->
        </div>
        <!-- 文章内容结束 -->
        <!-- 点赞 -->
        <like></like>
        <!-- 点赞end -->
        <!-- 评论 -->
         <!-- 评论列表 -->
        <div class="section comment">
          <h2 class="comment-title" v-html="`共 ${detail.articleInfor.commentCount} 条评论关于 “${detail.title.rendered}”`"></h2>
          <client-only>
            <comments :comment-status="detail.comment_status"/>
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import like from '~/components/likeit'
import Comments from '~/components/setComment/index.vue'
import QRCode from 'qrcode'

// import Reward from '~/components/Reward'

export default {
  name: 'Details',
  fetch ({ params, error, store }) {
    store.dispatch('article/updateArticleViewCount', { id: params.id })
    return store.dispatch('article/getArticleDetail', params.id)
  },
  components: {
    like,
    Comments,
    // Reward
  },
  data () {
    return {
      QRCodeUrl:'',
      isShowReward: false,
      isShowPoster: false,
      fullPath: '',
      rewardContent: {},
      posterContent: {},
      authorOtherInfo: {
        github: {
          icon: '#icon-GitHub'
        },
        qq: {
          icon: '#icon-qq1'
        },
        wechatNum: {
          icon: '#icon-weixin5'
        },
        sina: {
          icon: '#icon-xinlang1'
        },
        email: {
          icon: '#icon-youxiang'
        }
      }
    }
  },
  computed: {
    ...mapState(['info']),
    ...mapState('article', ['detail', 'viewCount', 'opinion'])
  },
  head () {
    let keywords = []
    this.detail.articleInfor.tags && this.detail.articleInfor.tags.forEach(item => keywords.push(item.name))
    return {
      title: `${this.detail.title.rendered} | ${this.info.blogName}`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: keywords.join(',') },
        { hid: 'description', name: 'description', content: this.detail.articleInfor.summary }
      ],
      // style: [
      //   { cssText: this.info.detailsCss, type: 'text/css' }
      // ]
    }
  },
  created () {
    this.fullPath = `${this.info.domain.replace(/\/$/, '')}${this.$route.path}`
    let other = this.detail.articleInfor.other

    // 合并作者数据
    for (let key in this.authorOtherInfo) {
      this.authorOtherInfo[key].url = other[key]
    }

    // // 打赏数据
    // this.rewardContent = {
    //   thumbnail: this.detail.articleInfor.other.authorPic,
    //   text: this.info.rewardText,
    //   alipay: this.info.alipay,
    //   wechatpay: this.info.wechatpay
    // }
  },
  mounted () {
    process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
  },
  beforeDestroy () {
    document.querySelectorAll('.prism-previewer').forEach(item => (item.style.display = 'none'))
  },
  methods: {
    // 显示微信号码
    _showWechatNum (num) {
      this.$message({
        title: `微信号：${num}`,
        showClose: true,
        showImg: true,
        center: true,
        wrapCenter: true,
        width: 280,
        imgUrl: this.detail.articleInfor.other.wechatPic,
        duration: 0
      })
    },
    // canvas
    // useqrcode(){
    //   var canvas = document.getElementById('canvas')
    //   QRCode.toCanvas(canvas, 'https://blog.csdn.net/weixin_42890953/article/details/82776760', function (error) {
    //     if (error) console.error(error)
    //     console.log('QRCode success!');
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
// 对于less或者sass等预编译，是不支持>>>操作符的，可以使用/deep/来替换>>>操作符，例如：.parent /deep/ .child { /* ... */ }
.content-details /deep/ h2{
    margin-top: 30px !important;
    margin-bottom: 10px !important;
    padding: 10px;
    border-left: 5px solid @main-theme;
    background: #f0f2f7;
}
.content-details /deep/ p {
  margin-top: 15px;
  font-size: 14px;
  line-height: 2;
  word-break: break-all;
   img {
    height: auto!important;
    max-width: 100%;
    max-height: 100%;
    vertical-align: top;
    border: 0;
    -webkit-box-shadow: 0 0 10px #d2d2d2;
    box-shadow: 0 0 10px #d2d2d2;
    }
  /*text-indent: 28px;*/
}
.comment-title{
    margin-bottom: 10px;
    padding: 10px 0;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
}
.container_ph{
  padding-top:@pdt;
  .article .title{
    padding: 10px 0;
    font-size: 20px;
    text-align: center;
  }
  .section{
      .title{
        padding:10px;
      }
      padding: 15px;
      background: #fff;
      border-radius: 4px;
  }
  .other-info{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9eaed;
    text-align: center;
    color: #999;
  }
  // .opinion{
  //     display: -webkit-box;
  //     display: -ms-flexbox;
  //     display: flex;
  //     -webkit-box-pack: center;
  //     -ms-flex-pack: center;
  //     justify-content: center;
  //     margin-bottom: 20px;
  //     text-align: center;
  //     .list{
  //       width: 50px;
  //       margin: 0 20px;
  //       cursor: pointer;
  //     }
  // }
}
</style>
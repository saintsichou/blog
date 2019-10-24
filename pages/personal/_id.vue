<template>
  <div class="container_ph">
    <div class="bgbox">
      <article class="at_box2 section">
        <h2 class="title">
          <span v-html="detail.title.rendered"></span>
        </h2>
        <div class="content-details" v-html="detail.content.rendered"></div>
        <!-- 评论列表 -->
        <div class="section comment">
          <h2 class="comment-title" v-html="`共 ${detail.pageInfor.commentCount} 条评论关于 “${detail.title.rendered}”`"></h2>
          <client-only>
            <comments :comment-status="detail.comment_status"/>
          </client-only>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Comments from '~/components/setComment'
import { mapState } from 'vuex'
export default {
  name: 'Page',
  layout: 'page',
  fetch ({ params, store }) {
    return store.dispatch('page/getPageDetail', params.id)
  },
  components: {
    Comments
  },
  computed: {
    ...mapState(['info']),
    ...mapState('page', ['detail'])
  },
  head () {
    return {
      title: `${this.detail.title.rendered} | ${this.info.blogName}`,
      link: [
        { rel: 'stylesheet', href: 'https://upyun.xuanmo.xin/css/prism.css' }
      ],
      style: [
        { cssText: this.info.detailsCss, type: 'text/css' }
      ],
      script: [
        { src: 'https://upyun.xuanmo.xin/js/prism.js' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
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

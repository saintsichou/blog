<template>
  <div class="container">
    <!-- 轮播图 -->
      <div class='banner' :style="'background:url('+info.banner.list[1].path+');background-attachment: fixed;'">
        <!-- <img :src="info.banner.list[1].path" alt=""> -->
        <div class="center_box">
          <p class='b_name' ref='bname' :style="'left:'+ -(this.leftbox * 1) +'px;'">{{this.info.blogName}}</p>
          <p class="b_des" ref='bdes' :style="'left:'+ (this.leftbox * 1) +'px;'">{{this.info.blogDescription}}</p>
        </div>
      </div>
    <!-- 说说 -->
    <div class="attachment">
      <div class="at_box">
        <a-card title="公告栏目" :bordered="true">
          <div class="content" v-html="info.notice"></div>
        </a-card>
      </div>
    </div>
    <!-- 最新文章 -->
    <div class="article_box">
      <div class="articles">
        <h1 class="art_title">
           <span class="bg">
             最新文章
           </span>
        </h1>
        <a-button icon="read" class="more">
          <nuxt-link :to="{ name: 'article-id', params: { id: 1 }}" class="btn">
            更多文章
          </nuxt-link>
        </a-button>
          <a-row class="art_cont">
            <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" v-for="item in articleList" :key="item.key" class="cardFs">
              <nuxt-link :to="{ name: 'details-id', params: { id: item.id } }" class="thumbnail-wrap">
                <a-card hoverable class="cardgo">
                  <img
                    alt="文章"
                    :src="item.articleInfor.thumbnail" 
                    slot="cover"
                  />
                  <span class="tios">{{item.articleInfor.classify[0].name}}</span>
                  <a-card-meta :title="item.title.rendered">
                    <template slot="description">
                      <span class="summary">{{item.articleInfor.summary}}</span>
                      <div class="opeartion">
                        <div class="information">
                          <a-icon type="calendar" /><span>{{ item.date }}</span>
                          <a-icon type="heart" /><span>{{ item.articleInfor.viewCount }}</span>
                          <a-icon type="message" /><span>{{ item.articleInfor.commentCount }}</span>
                          <a-icon type="like" /><span>{{ item.articleInfor.xmLike.very_good }}</span>
                        </div>
                      </div>
                    </template>
                  </a-card-meta>
                </a-card>
              </nuxt-link>
            </a-col>
          </a-row>
      </div>  
    </div>
    <!-- 结束文章 -->
    <comment></comment>
    <charts></charts>
    <!-- 分页 -->
    <!-- <a-pagination @change="_changePagination" :current="currentPage" :total="totalPage" /> -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import phrase from '~/components/phrase';
import comment from '~/components/comment';
import charts from '~/components/charts';
// import loadsvg from '~/components/Svgs/loadsvg';
export default {
  name: 'Index',
  fetch ({ store }) {
    store.commit('article/SET_CURRENT_PAGE', 1)
    return store.dispatch('article/getArticleList', {
      page: 1,
      per_page: 8,
      _embed: true
    })
  },
  components: {
    phrase,
    comment,
    charts
  },
  computed: {
    ...mapState(['info']),
    ...mapState('article', ['articleList', 'totalPage', 'currentPage'])
  },
  head () {
    return {
      title: `${this.info.blogName} | ${this.info.blogDescription}`,
      meta: [
        { name: 'keywords', content: this.info.keywords },
        { name: 'description', content: this.info.description }
      ]
    }
  },
  data () {
    return {
      leftbox:''
    }
  },
  created(){

  },
  mounted () {
    let self = this
    window.addEventListener('scroll', function () {
        // console.log(this.scrollY)
          self.leftbox = this.scrollY 
    })
  },
  beforeDestroy () {

  },
  methods: {
    _changePagination (id) {
      this.$router.push({
        name: 'article-id-title',
        params: { id }
      })
    },
    ...mapActions('phrase', ['getPhraseList'])
  }
}
</script>
<style lang='less'>
.cardgo{
  position: relative;
  .tios{
    position:absolute;
    top:10px;
    left:10px;
    background: linear-gradient(90deg,  #7d2ae8,#00c4cc,);
    padding:5px;
    color:#fff;
    border-radius: 5px;
    font-weight: 800;
  }
  .summary{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 10px;
  }
  img{
    height: 200px;
  }
}
.btn{
  color:rgba(0, 0, 0, 0.65)
}
.container {
  padding-top:@pdt;
  overflow: hidden;
}
.banner{
  width: 100%;
  height: 276px;
  background-attachment: fixed;
  background-size: contain;
  .center_box{
    width:1200px;
    height: 100%;
    margin:0 auto;
    position: relative;
  }
  .b_name{
    position: absolute;
    bottom: 180px;
    font-size: 30px;
    color:#fff;
    left:0;
  }
  .b_des{
    position: absolute;
    bottom: 110px;
    font-size: 24px;
    left:50px;
    color:#fff;
  }
}
.article_box{
  // background: url('../assets/images/bg2.jpg') no-repeat 100%/cover;
  // background-attachment: fixed;
  .art_cont{
    padding:20px 10px;
  }
  .articles{
    width:1200px;
    height:auto;
    margin:0 auto;
    box-sizing: border-box;
    background: rgba(250,250,250,.7);
    position: relative;
    .art_title{
      padding:15px 25px;
      // transform: skew(-20deg);
    }
    .more{
      position: absolute;
      right:0;
      top:0;
      margin:15px;
    }
  }
  .bannerWrapper{
    flex:1;
    width: 50%;
    height: 100%;
    img{
      width:100%;
      height: 100%;
      // padding:50px;
      box-sizing: border-box;
    }
  }
}
.cardFs{
  padding:15px;
  box-sizing: border-box;
}         
@media screen and (max-width: 1024px) {

}

@media screen and (max-width:767px) {
 .banner{
    width: 100%;
    height: 120px;
    background-attachment: fixed;
    background-size: contain;
    .center_box{
      width:auto;
      height: 100%;
      margin:0 auto;
      position: relative;
    }
    .b_name{
      position: absolute;
      top: 60px;
      left:10px;
      font-size: 14px;
      color:#fff;
    }
    .b_des{
      position: absolute;
      top: 90px;
      left:10px;
      font-size: 12px;
      color:#fff;
    }
  }
  .article_box{
    .articles{
      width:auto;
      height:auto;
      margin:0 auto;
      padding:0px;
      box-sizing: border-box;
      .bannerWrapper{
        flex:1;
        width: 100vw;
        height: 100%;
        img{
          width:100%;
          height: auto;
          box-sizing: border-box;
        }
      }
      .art_cont{
        padding:10px 0px;
      }
    }
  }
  .cardFs{
    padding:0;
    box-sizing: border-box;
  } 
  .cardFs:nth-child(3),.cardFs:nth-child(4),.cardFs:nth-child(5),.cardFs:nth-child(6){
    margin:0;
    padding:0
  }
  
}
</style>

<template>
<div class="container_ph">
    <div class="bgbox">
      <div class="at_box2">
        <h1 class="art_title">当前频道：{{ $route.query.title }}</h1>
        <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="articleList">
          <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
            <template slot="actions">
              <span>
                    <a-icon type="calendar" /><span style="margin-right:3px">{{ item.date }}</span>
                    <a-icon type="heart" /><span style="margin-right:3px">{{ item.articleInfor.viewCount }}</span>
                    <a-icon type="message" /><span style="margin-right:3px">{{ item.articleInfor.commentCount }}</span>
                    <a-icon type="like" /><span style="margin-right:3px">{{ item.articleInfor.xmLike.very_good }}</span>
              </span> 
            </template>
            <div slot="extra">
              <nuxt-link class="details-btn" :to="{ name: 'details-id', params: { id: item.id } }">
                <img
                    width="272"
                    alt="logo"
                    :src="item.articleInfor.thumbnail"
                  />
               </nuxt-link>
            </div>
            <a-list-item-meta :description="item.articleInfor.summary">
              <span slot="title">
                <nuxt-link class="details-btn" :to="{ name: 'details-id', params: { id: item.id } }">
                {{item.title.rendered}}
                </nuxt-link>
              </span>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
  <!-- <div class="container">
    <ul class="header">
      <li class="list">当前频道：{{ $route.query.title }}</li>
    </ul>
    <div v-if="articleList.length === 0" class="not">暂无数据！</div>
    <article v-else class="article-list" v-for="item in articleList" :key="item.key">
      <nuxt-link :to="{ name: 'details-id', params: { id: item.id } }" class="thumbnail-wrap">
        <img :src="item.articleInfor.thumbnail" class="thumbnail" alt="">
      </nuxt-link>
      <div class="list-content">
        <h2 class="title">
          <span class="classify" v-html="item.articleInfor.classify[0].name"></span>
          <nuxt-link :to="{ name: 'details-id', params: { id: item.id } }" class="vertical-middle" v-html="item.title.rendered"></nuxt-link>
        </h2>
        <p class="summary">{{ item.articleInfor.summary }}</p>
        <div class="opeartion">
          <div class="information">
            <span><x-icon type="icon-date"></x-icon>{{ item.date }}</span>
            <span><x-icon type="icon-hot1"></x-icon>{{ item.articleInfor.viewCount }}</span>
            <span><x-icon type="icon-message"></x-icon>{{ item.articleInfor.commentCount }}</span>
            <span><x-icon type="icon-good"></x-icon>{{ item.articleInfor.xmLike.very_good }}</span>
          </div>
          <nuxt-link class="details-btn" :to="{ name: 'details-id', params: { id: item.id } }">阅读详情</nuxt-link>
        </div>
      </div>
    </article>

    <el-pagination
      small
      :page-size="8"
      layout="prev, pager, next, jumper"
      :current-page="currentPage"
      @current-change="_changePagination"
      :total="totalPage">
    </el-pagination>

  </div> -->
</template>

<script>
import { mapState } from 'vuex'
export default {
  watchQuery: ['type'],
  name: 'Category',
  fetch ({ store, query, params }) {
    store.commit('article/SET_CURRENT_PAGE', +params.id)
    return store.dispatch('article/getArticleList', {
      categories: query.type,
      page: params.id,
      per_page: 8,
      _embed: true
    })
  },
  data(){
    return {
      pagination: {
        onChange (id) {
          this.$router.push({
            name: 'category-id',
            params: { id },
            query: {
              type: this.$route.query.type,
              title: this.$route.query.title
            }
          })
        },
        pageSize: 8,
        current:1,
        total:1
      }
    }
  },
  mounted(){
    this.pagination.total = this.totalPage
    this.pagination.current = this.currentPage
  },
  head () {
    return {
      title: `${this.$route.query.title} | ${this.info.blogName}`
    }
  },
  computed: {
    ...mapState(['info']),
    ...mapState('article', ['articleList', 'totalPage', 'currentPage'])
  },
  methods: {
    _changePagination (id) {
      this.$router.push({
        name: 'category-id',
        params: { id },
        query: {
          type: this.$route.query.type,
          title: this.$route.query.title
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container_ph{
  padding-top:72px;
  .art_title{
    font-weight: bold;
    font-size: 18px;
    padding:20px 0;
  }
  .ant-list-item:before{
    content: "";
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 0;
    height: 2px;
    background: #4285f4;
    transition: all .3s;
  }
  .ant-list-item:hover:before{
    width: 100%;
    left: 0;
    right: 0;
  }
}
@media screen and (max-width: 767px){
  .container_ph{
    .art_title{
      font-weight: bold;
      font-size: 18px;
      padding:20px 25px;
    } 
  } 
  
}
</style>

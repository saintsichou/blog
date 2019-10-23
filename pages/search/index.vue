<template>
  <div class="container_ph">
    <div class="bgbox">
      <div class="at_box2">
        <h1 class="art_title">
          <ul class="header text-center">
            <li class="list">共<span class="mark">{{ totalPage }}</span>条关于“<span class="mark">{{ $route.query.s }}</span>”的文章</li>
          </ul>
        </h1>
        <a-list itemLayout="vertical" size="large" :pagination="pagination2" :dataSource="articleList">
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Search',
  watchQuery: ['page', 's'],
  fetch ({ params, query, store }) {
    store.commit('article/SET_CURRENT_PAGE',+query.page)
    return store.dispatch('article/getArticleList', {
      search: query.s,
      page: query.page,
      per_page: 8,
      _embed: true
    })
  },
  data(){
    return {
      pagination2: {
        onChange: id => {
          console.log(id)
          // console.log(this.query.page)
          this.$store.commit('article/SET_CURRENT_PAGE', id)
          this.$router.push({
            name: 'search',
            query: {
              page: id,
              s: this.$route.query.s
            }
          })
        },
        pageSize: 8,
        // current:1,
        // total:0
      },
    }
  },
  created(){
    this.pagination2.total = this.totalPage
    this.pagination2.current = this.currentPage
    // console.log(this.currentPage)
  },
  mounted(){
    this.pagination2.total = this.totalPage
    this.pagination2.current = this.currentPage
  },
  computed: {
    ...mapState(['info']),
    ...mapState('article', ['articleList', 'totalPage', 'currentPage'])
  },
  head () {
    return {
      title: `关于“${this.$route.query.s}”的文章 | ${this.info.blogName}`
    }
  },
  methods: {
    _changePagination (id) {
      this.$store.commit('article/SET_CURRENT_PAGE', id)
      this.$router.push({
        name: 'search',
        query: {
          page: id,
          s: this.$route.query.s
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 文章列表
.container_ph {
  padding-top: @pdt;
  background: #fff;

  .header {
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 18px;

    .mark {
      color:@ft-color;
    }
  }
}

@media screen and (max-width:767px) {
  // 文章列表
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

}
</style>

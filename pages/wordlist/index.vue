<template>
  <div class="container_ph">
    <div class="bgbox">
      <div class="at_box2">
        <h1 class="art_title">文章列表</h1>
        <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="articleList">
          <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
            <template slot="actions">
              <span>
                    <a-icon type="calendar" /><span>{{ item.date }}</span>
                    <a-icon type="heart" /><span>{{ item.articleInfor.viewCount }}</span>
                    <a-icon type="message" /><span>{{ item.articleInfor.commentCount }}</span>
                    <a-icon type="like" /><span>{{ item.articleInfor.xmLike.very_good }}</span>
              </span> 
            </template>
            <img
              slot="extra"
              width="272"
              alt="logo"
              :src="item.articleInfor.thumbnail"
            />
            <a-list-item-meta :description="item.articleInfor.summary">
              <a slot="title" :href="item.href">{{item.title.rendered}}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Index',
  fetch ({ params,store }) {
    store.commit('article/SET_CURRENT_PAGE', +params.id)
    return store.dispatch('article/getArticleList', {
      page: params.id,
      per_page: 8,
      _embed: true
    })
  },
  data(){
    return {
      pagination: {
        onChange: id => {
          console.log(id);
          this.$store.commit('article/SET_CURRENT_PAGE', id)
          this.$router.push({
            name: 'article',
            params: { id }
          })
        },
        pageSize: 8,
        current:1,
        total:0
      },
    }
  },
  mounted(){
    this.pagination.total = this.totalPage
    this.pagination.current = this.currentPage
  },
  computed: {
    ...mapState(['info']),
    ...mapState('article', ['articleList', 'totalPage', 'currentPage'])
  },
  methods: {
    _changePagination (id) {
      this.$router.push({
        name: 'article-id-title',
        params: { id }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.container_ph{
  padding-top:72px;
}
.ant-list-pagination {
      margin-top: 24px;
      text-align: center;
      padding: 25px;
  }
</style>
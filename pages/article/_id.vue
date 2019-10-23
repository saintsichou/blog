<template>
  <div class="container_ph">
    <div class="bgbox">
      <div class="at_box2">
        <h1 class="art_title">文章列表</h1>
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
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Article',
  fetch ({params,store }) {
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
          this.$store.commit('article/SET_CURRENT_PAGE', id)
          this.$router.push({
            name: 'article-id-title',
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
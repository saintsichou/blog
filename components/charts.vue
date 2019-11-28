<template>
<div class="attachment">
  <div class="echarts">
    <!-- 词库云 -->
    <div class="sidebar_count">
      <a-card title="标签云" :bordered="false">
        <ul class="content">
          <template v-for="(item, index) in sidebar.tagCloud">
            <li :key="item.key" v-if="index < 18" class="list" :class="`color-${Math.floor(Math.random() * 8) + 1}`">
              <nuxt-link :to="{ name: 'tags-id', params: { id: 1 }, query: { type: item.term_id, title: item.name } }">{{ item.name }}</nuxt-link>
            </li>
          </template>
        </ul>
      </a-card>
    </div>
    <!-- 站点统计 -->
    <div class="sidebar_count">
      <a-card title="站点统计" :bordered="false">
        <p class="pst">标签：{{ sidebar.getAllCountTag }}个</p>
        <p class="pst">文章：{{ sidebar.getAllCountArticle }}篇</p>
        <p class="pst">页面：{{ sidebar.getAllCountPage }}个</p>
        <p class="pst">评论：{{ sidebar.getAllCountComment }}条</p>
        <p class="pst">分类：{{ sidebar.getAllCountCat }}个</p>
        <p class="pst" @dblclick="jump">最后更新：{{ sidebar.lastUpDate }}</p>
      </a-card>
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'charts',
  data(){
    return {

    }
  },
  mounted () {

  },
  computed: {
    ...mapState({
      sidebar: state => ({
        notice: state.info.notice,
        newComment: state.info.newComment,
        isOpenTextThumbnail: state.info.isOpenTextThumbnail,
        isOpenAsideCount: state.info.isOpenAsideCount,
        getAllCountTag: state.info.getAllCountTag,
        getAllCountArticle: state.info.getAllCountArticle,
        getAllCountPage: state.info.getAllCountPage,
        getAllCountComment: state.info.getAllCountComment,
        getAllCountCat: state.info.getAllCountCat,
        lastUpDate: state.info.lastUpDate,
        tagCloud: state.info.tagCloud
      })
    })
  },
  methods:{
    jump(){
      window.open('http://liqianrui.liyichuan.top/wp-login.php','_blank')
    },
  }
}
</script>

<style scoped lang="less">
  .echarts{
    width: 1200px;
    height: 100%;
    // background: rgba(250,250,250,.7);
    overflow: auto;
    margin:0 auto;
    display: flex;
  }
  .sidebar_count{
    width:auto;
    height: auto;
    color:rgba(0, 0, 0, .45);
    // background: rgba(250,250,250,.7);
    float: left;
    flex: 1;
    .ant-card{
      margin:35px 0;
      background: transparent;
    }
  }
  .content{
    
    .list{
      display: block;
      float: left;
      border-radius: 10px;
      text-align: center;
      padding:5px 5px;
      margin:5px

    }
   a{
      color: #fff;
    }
    & .color-1{
      background: #f3a683;
    }

    & .color-2{
      background: #778beb;
    }

    & .color-3{
      background: #e77f67;
    }

    & .color-4{
      background: #f5cd79;
    }

    & .color-5{
      background: #0fb9b1;
    }

    & .color-6{
      background: #f8a5c2;
    }

    & .color-7{
      background: #596275;
    }

    & .color-8{
      background: #20bf6b;
    }
  }
  @media screen and (max-width:767px) {
     .echarts{
      width: 100%;
      height: 100%;
      // background: rgba(250,250,250,.7);
      overflow: auto;
      margin:0 auto;
      display: flex;
      flex-direction: column;
    }
  }
</style>
<template>
<div class="attachment">
  <div class="echarts">
    <!-- 词库云 -->
    <div id="myChart2"></div>
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
// import "echarts-wordcloud/dist/echarts-wordcloud";
// import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
  name: 'charts',
  data(){
    return {
      img:"data:image/png;base64,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"
    }
  },
  mounted () {
    this.echartsInit3()
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
      window.open('http://www.liyichuan.top:3002/wp-login.php','_blank')
    },
    echartsInit3(){
       // 找到容器
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      // var maskImage = new Image();
      // maskImage.src = this.img
      // 开始渲染
      myChart.setOption({
        tooltip: {
            show: false
        },
        series: [{
            name: '前端笔记',
            type: 'wordCloud',
            size: ['80%', '80%'],
            textRotation : [0, 45, -45],
            textPadding: 0,
            // maskImage: maskImage,
            textStyle: {
              normal: {
                  color: function() {
                      return 'rgb(' +
                              Math.round(Math.random() * 255) +
                              ', ' + Math.round(Math.random() * 255) +
                              ', ' + Math.round(Math.random() * 255) + ')'
                  }
              }
            },
            autoSize: {
                enable: true,
                minSize: 14
            },
            data:this.sidebar.tagCloud.map(res=>{
              return {
                name:res.name,
                value:res.count
              }
            })
        }]
      })
      myChart.resize()
    }
  }
}
</script>

<style scoped lang="less">
  .echarts{
    width: 1200px;
    height: 100%;
    background: rgba(250,250,250,.7);
    overflow: auto;
    margin:0 auto;
    display: flex;
  }
  .sidebar_count{
    width:auto;
    height: auto;
    color:rgba(0, 0, 0, .45);
    background: rgba(250,250,250,.7);
    float: left;
    flex: 1;
    .ant-card{
      margin:35px 0;
      background: transparent;
    }
  }
  #myChart2{
    width: auto;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    float: left;
    flex: 1;
  }
  @media screen and (max-width:767px) {
     .echarts{
      width: 100%;
      height: 100%;
      background: rgba(250,250,250,.7);
      overflow: auto;
      margin:0 auto;
      display: flex;
    }
     #myChart2{
      width: auto;
      height: 300px;
      margin-left: auto;
      margin-right: auto;
      float: left;
      flex: 1;
    }
  }
</style>
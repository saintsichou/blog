<template>
    <!-- 最新评论 -->
    <div class="container_ph">
      <div class="attachment">
        <div class="at_box">
          <h1 class="art_title">最新评论</h1>
            <a-comment v-for="item in sidebar.newComment" :key="item.key" class="demo-loadmore-list">
              <a slot="author">{{item.author}}</a>
              <a-avatar
                :src="item.avatar"
                :alt="item.author"
                slot="avatar"
              />
              <p slot="content" class="com_cont">
                {{item.content}}
              </p>
              <p class="resource">
                <nuxt-link v-if="item.postType === 'post'" :to="{ name: 'details-id', params: { id: item.id } }" class="block title">评论：{{ item.title }}</nuxt-link>
                <nuxt-link v-else-if="item.postType === 'page'" :to="{ name: 'page-id', params: { id: item.id } }" class="block title">评论：{{ item.title }}</nuxt-link>
              </p>
              <!-- <a-tooltip slot="datetime" :title="item.date">
                <span>{{moment().fromNow()}} {{item.date}}</span>
              </a-tooltip> -->
            </a-comment>
        </div>
      </div>
    </div>
    <!-- 最新评论 -->
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import CryptoJS from "crypto-js";
const crypto = require('crypto');
export default {
  name: 'comment',
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
  mounted(){
    // let url = this.gravatar('123@126.com')
    // console.log(url)
  },
  data(){
    return {
      moment,
    }
  },
  methods:{
    gravatar(mail) {
      let size = 100
      let hash = crypto.createHash('md5').update(mail.trim().toLowerCase()).digest("hex")
      return `http://www.gravatar.com/avatar/${hash}?s=${size}&d=robohash`;
    }  
  }
}
</script>
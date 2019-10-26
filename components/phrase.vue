<template>
  <div class="container_ph">
    <div class="attachment">
      <div class="at_box">
        <h1 class="art_title">我的说说</h1>
        <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="data">
          <div
            v-if="showLoadingMore"
            slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '1em',marginBottom: '1em', height: '2em', lineHeight: '2em' }"
          >
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore">加载更多</a-button>
          </div>
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
              :description="item.content"
            >
              <span slot="title">{{item.date}}</span>
              <a-avatar
                slot="avatar"
                :src="item.avatar"
              />
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
  name: 'Phrase',
  layout: 'page',
  
  data(){
    return {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        allPhase:0,
        i:0
    }
  },
  computed: {
    ...mapState('phrase', ['list'])
  },
  created () {
    
    this.getPhraseList().then(res=>{
      this.loading = false;
      this.allPhase = res.length;
      this.data = res.slice(0,3);
      this.i = this.data.length
    })
  },
  methods: {
    onLoadMore() {
      this.loadingMore = true;
      this.getPhraseList().then(res => {
        this.data = this.data.concat(res.slice(this.i,this.i+3));
        this.loadingMore = false;
        this.i+=3;
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    },
    ...mapActions('phrase', ['getPhraseList'])
  }
}
</script>


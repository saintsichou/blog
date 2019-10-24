<template>
  <header>
    <div class="pc_header">
      <div class="header_nav">
          <div class="logo_header" slot='title'>
                <h1>{{ info.blogName }}</h1>
                <nuxt-link :to="{ name: 'index' }" class="block">
                  <img :src="info.logo" class="vertical-middle" width="165" height="50">
                </nuxt-link>
          </div>
      </div>
      <a-button shape="circle" :icon="ismusic?'caret-right':'pause'" class="music_btn" @click="showMusic"/>
      <a-button shape="circle" :icon="isShowSearch?'search':'up'"  class="search_btn" @click="showSearch"/>
      <a-button @click="showDrawer" class="icon" :icon="visible?'close':'thunderbolt'" size="large">
      </a-button>
      <a-drawer
        placement="left"
        :closable="false"
        @close="onClose"
        :visible="visible"
      >
        <div class="logo" slot='title'>
              <h1>{{ info.blogName }}</h1>
              <nuxt-link :to="{ name: 'index' }" class="block">
                <img :src="info.logo" class="vertical-middle" width="130" height="40">
              </nuxt-link>
        </div>
        <div class="navbar">
          <a-menu
            mode="inline"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['2']"
            style="width: 100%;background:#fff;border:none"
          >
            <template v-for="item in menu">
              <a-menu-item :key="item.key" v-if="item.children.length == 0">
                <nuxt-link
                    v-if="item.object === 'category'"
                    :to="{
                      name: `${item.object}-id`,
                      params: { id: 1 },
                      query: { type: item.object_id, title: item.title }
                    }"
                    :class="['first-link', item.children.length !== 0 && 'prohibit-event__none']"
                  >
                    {{ item.title }}
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="item.object === 'page'"
                    :to="{ name: 'personal-id', params: { id: item.object_id } }"
                    class="first-link">
                    {{ item.title }}
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="item.object === 'post_tag'"
                    :to="{ name: 'tags-id', params: { id: 1 }, query: { type: item.term_id, title: item.name } }"
                    class="first-link">
                    {{ item.title }}
                  </nuxt-link>
                  <a v-else-if="item.object === 'custom'" :href="item.url" class="first-link">
                    {{ item.title }}
                  </a>
              </a-menu-item>
              <submenu v-if="item.children.length !== 0" :menuinfo="item" :key="item.key"/>
            </template>
          </a-menu>
        </div>
      </a-drawer>
    </div>
    <!-- 搜索开始 -->
    <div :class="['search-wrapper',isShowSearch?'isshow':'']">
          <a-input-search
            placeholder="请输入关键字"
            style="height: 60px;"
            @search="onSearch"
            
          />
    </div>
    <!-- 搜索结束 -->
    <!-- music -->
    <span :class="['tip',ismusic?'isshow2':'']">
            <iframe src="http://music.163.com/outchain/player?type=0&amp;id=3039557527&amp;auto=1&amp;height=280" width="330" height="300" frameborder="no" marginwidth="0" marginheight="0" zIndex='999'></iframe>
    </span>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import submenu from '~/components/submenu'


export default {
  watchQuery: ['type'],
  name: 'Header',
  components: {
    'submenu':submenu
  },
  data () {
    return {
      visible: false,
      showMenu:false,
      searchText: '',
      isShowSearch: true,
      ismusic:true,
      current: ['mail'],
      rootSubmenuKeys: [],
      openKeys: [],
    }
  },
  watch: {
    
  },
  computed: {
    ...mapState(['info', 'menu', 'menuStatus']),
    
  },
  methods:{
    showDrawer() {
      this.visible = true
    },
    showMusic(){
      this.ismusic = !this.ismusic
    },
    onClose() {
      this.visible = false
    },
    showSearch(){
      this.isShowSearch = !this.isShowSearch
    },
    // 搜索
    onSearch (value) {
      this.isShowSearch = !this.isShowSearch
      this.$router.push({
        name: 'search',
        query: {
          page: 1,
          s: value
        }
      })
      
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    //show menu
    show(){
      this.showMenu = !this.showMenu
    }
  }
}
</script>
<style lang="less" scoped>
.header_nav{
  width: 100%;
  position: fixed;
  top:0;
  background:@color-theme;
  // background: #fff;
  z-index: 4;
  .logo_header{
    padding:10px;
  }
  h1{
    position: fixed;
    top: -500%;
    left: 0;
  }
}
.logo{
  margin: 10px;
  position: relative;
  background: @color-theme;
  h1{
    position: fixed;
      top: -500%;
      left: 0;
  }
}
.navbar{
  width:90%;
  height:100vh;
  margin:0 auto;
  .navs{
    width: 100%;
    li{
      color:#fff;
      font-size: 20px;
      padding: 10px 0;
      text-align: center;
      cursor: pointer;
    }
  }
}
.headers{
  width: 100vw;
  height:100vh;
  position:absolute;
  background: #fff;
  z-index: 2;
}
.up{
  transform: translateY(-100%);
}
.down{
   transform: translateY(0%);
}
// 搜索框
.search-wrapper {
  width: 100%;
  position:fixed;
  right: 0;
  top:70px;
  background: transparent;
  padding:0 15px;
  box-sizing: border-box;
  z-index:3;
  transition: all .3s linear;
}
.search_btn{
  // font-size: 30px;
  cursor: pointer;
  position: fixed;
  z-index: 4;
  right: 70px;
  top: 23px;
  margin-top: -3px;
  color:rgba(255,255,255,.9);
  background: transparent;
}
.music_btn{
  // font-size: 30px;
  cursor: pointer;
  position: fixed;
  z-index: 4;
  right: 120px;
  top: 23px;
  margin-top: -3px;
  color:rgba(255,255,255,.9);
  background: transparent;
}
.tip{
    position: fixed;
    top: 120px;
    right: 0;
    z-index: 2;
    transition: all .3s linear;
}
.icon{
  font-size: 20px;
  padding: 6px 6px 5px;
  border-radius: 2px;
  cursor: pointer;
  position: fixed;
  z-index: 4;
  right: 20px;
  top: 18px;
  margin-top: -3px;
  color:rgba(255,255,255,.9);
  background: transparent;
}
.phone_header{
  display: none;
}
.isshow{
  transform: translateY(-100%);
  opacity: 0;
}
.isshow2{
  transform: translateX(100%);
  opacity: 0;
}
@media screen and (max-width:767px) {
  
}
</style>

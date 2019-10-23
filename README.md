# realgo-Blog

> 李二狗博客

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
<template>
  <header class="headers">
    <div class="logo">
          <h1>{{ info.blogName }}</h1>
          <nuxt-link :to="{ name: 'index' }" class="block">
            <img :src="info.logo" class="vertical-middle" width="130" height="40">
          </nuxt-link>
          <a-icon type="down-circle" class="icon"/>
    </div>
    <div class="navbar">
      <a-menu
          mode="inline"
          :openKeys="openKeys"
          @openChange="onOpenChange"
          style="width: 100%"
        >
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>Option 1</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
            <a-menu-item key="1">Option 1</a-menu-item>
            <a-menu-item key="2">Option 2</a-menu-item>
            <a-menu-item key="3">Option 3</a-menu-item>
            <a-menu-item key="4">Option 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="7">Option 7</a-menu-item>
              <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      <!-- <ul class="navs">
        <li v-for="item in menu" :key='item.ID'>{{item.title}}</li>
      </ul> -->
    </div>
    <!-- 搜索开始 -->
    <!-- <div :class="['search-wrapper']">
          <a-input-search
            placeholder="请输入关键字"
            style="width: 20em"
            @search="onSearch"
            @keyup.enter="onSearch"
          />
    </div> -->
    <!-- 搜索结束 -->
  </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
  watchQuery: ['type'],
  name: 'Header',
  data () {
    return {
      searchText: '',
      isShowSearch: false,
      current: ['mail'],
    }
  },
  watch: {
    
  },
  computed: {
    ...mapState(['info', 'menu', 'menuStatus']),
    
  },
  methods:{
    // 搜索
    onSearch (value) {
      console.log(value)
      this.$router.push({
        name: 'search',
        query: {
          page: 1,
          s: value
        }
      })
      this.isShowSearch = false
    },
  }
}
</script>
<style lang="less" scoped>
.logo{
  margin: 30px;
  position: relative;
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
  background: rgba(0,0,0,.6);
  z-index: 2;
}
// 搜索框
.search-wrapper {
  width: 200px;
  position:absolute;
  right: 220px;
  top:8px;
}
.icon{
  font-size: 20px;
  padding: 6px 6px 5px;
  border-radius: 2px;
  cursor: pointer;
  position: absolute;
  z-index: 4;
  right: 10px;
  top: 10px;
  margin-top: -3px;
  background: rgba(255,255,255,.9);
}
</style>


<template v-for="item in menu">
        <a-sub-menu
            :key="item.key"
          >
            <span slot="title">
              <a-icon :type="item.classes" /><span>{{ item.title }}</span>
              <a-icon v-if="item.children.length !== 0" type="down" />
            </span>
            <template v-for="child in item.children">
              <a-menu-item
                v-if="!child"
                :key="child.key"
              >
              <span>{{ item.title }}</span>
              </a-menu-item>
              <a-menu-item :key="child.key">
                <nuxt-link
                    v-if="child.object === 'category'"
                    :to="{
                      name: 'category-id',
                      params: { id: 1 },
                      query: { type: child.object_id, title: child.title }
                    }"
                  >
                    {{ child.title }}
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="child.object === 'page'"
                    :to="{
                      name: 'page-id',
                      params: { id: child.object_id }
                    }"
                  >
                    {{ child.title }}
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="child.object === 'post_tag'"
                    :to="{ name: 'tags-id', params: { id: 1 }, query: { type: child.object_id, title: child.title } }">
                    {{ child.title }}
                  </nuxt-link>
                  <a v-else-if="child.object === 'custom'" :href="child.url">
                    {{ child.title }}
                  </a>
              </a-menu-item>
            </template>
        </a-sub-menu>
      </template>
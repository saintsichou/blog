
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "弈川的博客" || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'format-detection', content: 'telephone=no' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'prism', rel: 'stylesheet', href: '/css/prism.css' }
    ],
    script: [
      // { src: '//at.alicdn.com/t/font_556506_8c5mvyqjye4.js' },
      { src: '/js/prism.js' },
      // 百度主推文章收录用
      // { src: 'https://zz.bdstatic.com/linksubmit/push.js' },
      // 加入百度统计js，使用时自行添加为自己的
      // { src: 'https://hm.baidu.com/hm.js?' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: 'components/loading.vue',
  router: {
    middleware: 'global',
    scrollBehavior (to, from, savedPosition) {
      return {
        x: 0,
        y: 0
      }
    }
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    './assets/css/main.css',
    './assets/css/reset.css',
    {
      src:'./assets/css/common.less',
      lang:'less'
    }
  ],
  styleResources: {
    less: './assets/css/var.less'
  },
  /*
  ** Plugins to load before mounting the App
  */

  plugins: [
    '~/plugins/axios',
    '~plugins/charts',
    // '~plugins/cloud',
    {src:'~plugins/cloud',ssr:false },
    { src: '~/plugins/antd-ui', ssr: true },
    // { src: '~/plugins/message', ssr: false },
    // { src: '~/plugins/icon', ssr: true }
    // { src: '~/plugins/common', ssr: false }
  ],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true
  },

  build: {
    transpile: [/^antd-ui/],
    extractCSS: true,
    vendors: ['@nuxtjs/axios', 'antd-ui'],
    // extend(config, ctx) {
    // }
  },

  // 将此处2个地址改为自己的地址
  proxy: {
    '/api': {
      target: 'https://www.xuanmo.xin',
      pathRewrite: {
        '^/api': '/'
      }
    },
    '/wp-content': {
      target: 'https://www.xuanmo.xin'
    }
  },

  env: {
    baseUrl: '/api'
  }
  /*
  ** Nuxt.js dev-modules
  */

  /*
 
  /*
  ** Build configuration
  */
  
}

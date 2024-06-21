/*
 * @Author: richmanfu richmanfu@tencent.com
 * @Date: 2024-05-09 04:46:55
 * @LastEditors: richmanfu richmanfu@tencent.com
 * @LastEditTime: 2024-05-29 19:30:45
 * @FilePath: /my-nuxt3/nuxt.config.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
import customRouterConfig from './src/app/router.options';
import viteCompression from 'vite-plugin-compression';

/**
 * 获取自定义环境变量（以NUXT_开头的环境变量都视作是自定义的环境变量）
 * @param obj
 * @returns
 */
function getOwnEnv(env: Record<string, any>): Record<string, any> {
  const ownEnv: Record<string, any> = {};
  for (const key in env) {
    if (
      Object.prototype.hasOwnProperty.call(env, key) &&
      key.startsWith('NUXT_')
    ) {
      ownEnv[key] = env[key];
    }
  }
  return ownEnv;
}

export default defineNuxtConfig({
  ssr: false,
  alias: {
    '@/': '/src',
    'assets/': '/src/assets',
  },
  vite: {
    server: {
      proxy: {
        [`${process.env.NUXT_BASE_URL}/api`]: {
          // 接口代理地址
          target: 'https://baidu.com',
          rewrite: (path) =>
            path.replace(new RegExp(`${process.env.NUXT_BASE_URL}`), ''),
          changeOrigin: true,
          prependPath: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '~/assets/styles/varible.scss';",
        },
      },
    },
    plugins: [
      viteCompression({
        verbose: true,
        disable: false,
        deleteOriginFile: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
  },
  css: ['assets/css/themes.css'],
  plugins: ['~/plugins/theme.ts'],
  app: {
    baseURL: process.env.NUXT_BASE_URL,
    buildAssetsDir: '/',
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-CN en-US',
      },
      title: '官网',
      meta: [
        {
          name: 'description',
          content: '',
        },
        {
          name: 'keywords',
          content: 'AI 科技 自动化 智能制造',
        },
        { name: 'publisher', content: 'baissic' },
        { name: 'author', content: 'baissic-TGideas' },
        { name: 'robots', content: 'all' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0,viewport-fit=cover',
        },
        { 'http-equiv': 'content-type', content: 'IE=edge,chrome=1' },
      ],
    },
  },
  router: {
    options: {
      hashMode: false,
    },
  },
  postcss: {
    plugins: {
      // 这个工具可以实现自动添加CSS3前缀
      autoprefixer: {
        overrideBrowserslist: ['last 5 version', '>1%', 'ie >=8'],
      },
      'postcss-pxtorem': {
        rootValue: 100, // 指定转换倍率，我现在设置这个表示1rem=100px;
        propList: ['*'], // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
        mediaQuery: false, // 是否允许使用媒体查询，false媒体查询的代码可用，true不可用
        exclude: 'ignore',
        replace: true, // 替换包含rem的规则，而不是添加回退
        minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
        unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
        selectorBalckList: ['van'], // 匹配不被转换为rem的选择器
      },
    },
  },
  serverDir: 'server', //指定服务器代码目录
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      ...getOwnEnv(process.env),
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      standalone: false, // 关闭默认配置（默认情况下，此模块会使用推荐的规则安装 JS、TS 和 Vue 插件）
    },
  },
  srcDir: 'src/', //指定src作为根目录
  build: {
    analyze: true, // 开启打包分析
  },
  nitro: {
    // 配置客户端请求代理
    devProxy: {
      '/api': {
        target: 'http://localhost:8888', // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/api/**': {
        proxy: 'https://baidu.com/api/**',
      },
    },
  },
});


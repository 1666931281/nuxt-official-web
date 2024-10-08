// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import viteCompression from 'vite-plugin-compression'
import removeConsole from 'vite-plugin-remove-console'

/**
 * 获取自定义环境变量（以NUXT_开头的环境变量都视作是自定义的环境变量）
 * @param obj
 * @returns
 */
function getOwnEnv(env: Record<string, any>): Record<string, any> {
  const ownEnv: Record<string, any> = {}
  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key) && key.startsWith('NUXT_')) {
      ownEnv[key] = env[key]
    }
  }
  return ownEnv
}

/**
 * 为路径添加后缀
 * @param path
 * @returns
 */
// function createEndWithSlash(path: string, slash: string = '/'): string {
//   const result = path?.endsWith(slash) ? path : `${path}${slash}`;
//   return result;
// }

export default defineNuxtConfig({
  ssr: false,
  alias: {
    '@/': '/src',
    '@assets': '/src/assets',
  },

  typescript: { typeCheck: true },

  // 指定src作为根目录
  srcDir: 'src/',

  app: {
    baseURL: process.env.NUXT_BASE_URL,
    // buildAssetsDir: '/',
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-CN en-US',
      },
      title: '网站名称',
      meta: [
        {
          name: 'description',
          content: '网站描述',
        },
        {
          name: 'keywords',
          content: '关键词',
        },
        { name: 'publisher', content: 'xxx' },
        { name: 'author', content: 'xxx' },
        { name: 'robots', content: 'all' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0,viewport-fit=cover',
        },
        { 'http-equiv': 'content-type', 'content': 'IE=edge,chrome=1' },
      ],
      script: [
        {
          // src: `${createEndWithSlash(process.env.NUXT_BASE_URL as string)}rem.js`,
        },
      ],
    },
  },

  router: {
    options: {
      hashMode: false,
    },
  },
  // 指定服务器代码目录
  serverDir: 'server',

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      ...getOwnEnv(process.env),
    },
  },

  build: {
    analyze: true, // 开启打包分析
  },

  modules: ['@nuxt/eslint', '@element-plus/nuxt', '@unocss/nuxt', '@pinia/nuxt', '@nuxtjs/i18n'],
  css: ['element-plus/dist/index.css', '@/assets/styles/index.scss'],

  vite: {
    server: {
      proxy: {
        [`${process.env.NUXT_BASE_URL}/game`]: {
          // 接口代理地址
          target: 'https://app.ingame.com',
          rewrite: path => path.replace(new RegExp(`${process.env.NUXT_BASE_URL}`), ''),
          changeOrigin: true,
          prependPath: true,
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
      removeConsole(),
    ],
  },

  nitro: {
    // 配置客户端请求代理
    devProxy: {
      '/api': {
        target: 'http://localhost:3000', // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/xxx/**': {
        proxy: 'https://app.ingame.com/xxx/**',
      },
    },
  },
  i18n: {
    strategy: 'no_prefix', // 添加路由前缀的方式
    locales: ['en', 'zh'], // 配置语种
    defaultLocale: 'zh', // 默认语种
    vueI18n: './i18n.config.ts', // 通过vueI18n配置
  },
  compatibilityDate: '2024-08-01',
})

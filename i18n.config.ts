import en from './public/locales/en.json'
import zh from './public/locales/zh.json'

export default defineI18nConfig(() => ({
  legacy: false, // 是否兼容之前
  locale: 'zh', // 默认语言
  messages: {
    // 对应的语言
    en,
    zh,
  },
}))

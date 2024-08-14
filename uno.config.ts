// uno.config.ts
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // 自定义的类型
  shortcuts: [['costom-btn', 'w-200px h-40px bg-green']],
  theme: {
    colors: {
      NuxtFont: '#000000',
      boxBg: '#6032b5',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        icon: FileSystemIconLoader('./src/assets/icon', svg => svg.replace(/#FFF/, 'currentColor')),
      },
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Microsoft YaHei',
      },
    }),
  ],
  rules: [
    [
      /^bgi-\[([\s\S]+)\]$/,
      ([, d]) => {
        const basePath = '~/assets'
        const parts = d.split('/') // 将匹配到的字符串按'/'分割
        let folderPath = 'images' // 初始默认文件夹为 images
        if (parts.length > 1) {
          // 如果有多个部分，说明指定了文件夹
          folderPath += `/${parts[0]}` // 取第一个部分作为文件夹
          d = parts.slice(1).join('/') // 剩余部分作为文件名
        }

        const fullPath = `${basePath}/${folderPath}/${d}`
        return { 'background-image': `url('${fullPath}')` }
      },
    ],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})

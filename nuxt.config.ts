// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
  ssr: false,
  alias: {
    '@': '/src',
    '@assets': '/src/assets',
  },
  typescript: { typeCheck: true },
});

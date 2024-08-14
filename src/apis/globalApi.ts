import { customUseFetch } from '~/composables/useHttp';

interface mossApiRequest {
  game: string;
  order: number;
  ingame_channel_id: number;
  start: number;
  num: number;
}

interface catReq {
  limit: number;
}
const MOOS_BASE_URL = useRuntimeConfig().public.NUXT_MOSS_API_BASE;
console.log(MOOS_BASE_URL);

export async function getContentListByChannel(params: mossApiRequest) {
  const url = '/gingame/content/content_list_by_channel';
  const data = await customUseFetch(url, {
    baseURL: MOOS_BASE_URL,
    immediate: true,
    query: { ...params },
  });

  return data;
}
export async function getCatPhoto(params: catReq) {
  const url = '/v1/images/search';
  const data = await customUseFetch(url, {
    baseURL: 'https://api.thecatapi.com',
    immediate: true,
    query: { ...params },
  });

  return data;
}

import { customUseFetch } from '~/composables/useHttp';
interface mossApiRequest {
  game: string;
  order: number;
  ingame_channel_id: number;
  start: number;
  num: number;
}
// interface HomeServiceGetHomeInfoResponse {
//   data: HomeDataRes;
//   code: number;
//   msg: string;
// }
const MOOS_BASE_URL = useRuntimeConfig().public.NUXT_MOSS_API_BASE;
console.log(MOOS_BASE_URL);

export const getContentListByChannel = async (params: mossApiRequest) => {
  const url = '/gingame/content/content_list_by_channel';
  const data = await customUseFetch(url, {
    baseURL: MOOS_BASE_URL as string,
    immediate: true,
    query: { ...params },
  });

  return data;
};

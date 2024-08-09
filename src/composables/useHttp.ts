import { ElMessage } from 'element-plus'

interface FetchError {
  name: string
  message: string
}

interface RequestParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  baseURL?: string
  query?: any
  immediate?: boolean
  timeout?: number // 新增请求超时时间参数
}

interface Headers {
  'Content-Type': string
  'Authorization'?: string
  'User-Agent': string
}

const defaultHeaders: Headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'MyApp/1.0',
}

const defaultBaseUrl = 'https://default-api.com'

export async function customUseFetch(url: string, opt: RequestParams, customHeaders: Partial<Headers> = {}): Promise<any> {
  const { method = 'GET', query, immediate, timeout = 10000 } = opt // 设置默认超时时间为 10 秒
  const normalizedMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' = method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE'
  const headers = {
    ...defaultHeaders,
    ...customHeaders,
  }

  const runtimeConfig = useRuntimeConfig()
  console.log(opt.baseURL)

  const baseURL = opt.baseURL ? opt.baseURL : defaultBaseUrl

  const finalUrl = `${baseURL}${url}`
  try {
    const response: any = await useFetch(finalUrl, {
      method: normalizedMethod,
      query,
      headers,
      immediate: immediate || true,
      async onRequest({ options }) {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)
        options.signal = controller.signal
        return () => clearTimeout(timeoutId)
      },
    })
    console.log(response)

    // 添加 watch 监听 query 变化
    watch(query, () => {
      console.log('请求数据', query)
      response.refresh()
    })
    // 处理请求错误
    if (response.data.value.code !== 0) {
      const isDev = runtimeConfig.public.NUXT_NODE_ENV === 'development'
      const errorMessage = isDev ? `请求发生错误: ${response.data.value.code.msg}` : '服务异常'
      ElMessage({
        type: 'error',
        message: errorMessage,
      })
    }

    // 处理响应错误 这里可以根据具体状态码做逻辑处理，比如 401 可能需要登录等等
    if (response.data && response.data.value.code >= 400) {
      const isDev = runtimeConfig.public.NUXT_NODE_ENV === 'development'
      const errorMessage = isDev
        ? `响应错误: 状态码 ${response.data.value.code}, 消息: ${response.data.value.msg}`
        : '服务异常'
      ElMessage({
        type: 'error',
        message: errorMessage,
      })
    }

    return response.data.value
  }
  catch (error: any) {
    if (error.name === 'AbortError') {
      ElMessage({
        type: 'error',
        message: '请求超时',
      })
    }
    else {
      const fetchError: FetchError = {
        name: error.name,
        message: error.message,
      }
      ElMessage({
        type: 'error',
        message: fetchError.message,
      })
    }
  }
}

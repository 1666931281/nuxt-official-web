const MOBILE_REGEXP = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i
export function useDeviceUrl() {
  console.log(window.location.href)

  const isPcUrl = window?.location.href.includes('/pc')
  const isMobileUrl = window?.location.href.includes('/mobile')

  const switchDevice = () => {
    const UA = window?.navigator.userAgent
    const type = MOBILE_REGEXP.test(UA) ? 'mobile' : 'pc'
    console.log(type)
    console.log(isPcUrl, isMobileUrl)

    if (type === 'pc' && isMobileUrl) {
      console.log('是pc')

      window.location.href = window.location.href.replace('/mobile', '/pc')
    }

    if (type === 'mobile' && isPcUrl) {
      console.log('是m')

      window.location.href = window.location.href.replace('/pc', '/mobile')
    }
  }

  const throttleSwitchDevice = throttle(switchDevice, 80)

  onMounted(() => {
    switchDevice()
    window.addEventListener('resize', throttleSwitchDevice)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', throttleSwitchDevice)
  })
}
export function useDeviceType() {
  let UA: string
  if (import.meta.client) {
    // 如果是在客户端执行，则通过 navigator 获取 user-agent
    UA = navigator.userAgent
  }
  else {
    // 如果是在服务端执行，则通过请求头获取 user-agent
    UA = useRequestHeader('user-agent') as string
  }
  const type = ref<'mobile' | 'pc'>('pc')
  // 通过 UA 来判断设备类型是 pc 还是 mobile
  if (/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA)) {
    type.value = 'mobile'
  }
  else {
    type.value = 'pc'
  }
  return type
}

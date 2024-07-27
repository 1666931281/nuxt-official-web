const MOBILE_REGEXP = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i;

export default function useDeviceUrl() {
  const isPcUrl = !!window?.location.href.match(/\/pc\//);
  const isMobileUrl = !!window?.location.href.match(/\/mobile\//);

  const switchDevice = () => {
    const UA = window?.navigator.userAgent;
    const type = MOBILE_REGEXP.test(UA) ? 'mobile' : 'pc';
    console.log(type);

    if (type === 'pc' && isMobileUrl) {
      window.location.href = window.location.href.replace('/mobile/', '/pc/');
    }

    if (type === 'mobile' && isPcUrl) {
      window.location.href = window.location.href.replace('/pc/', '/mobile/');
    }
  };

  const throttleSwitchDevice = throttle(switchDevice, 80);

  onMounted(() => {
    switchDevice();
    window.addEventListener('resize', throttleSwitchDevice);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', throttleSwitchDevice);
  });
}

export default defineNuxtPlugin(() => {
  (function (win, doc) {
    if (!win?.addEventListener)
      return
    function setRem() {
      const UA = navigator.userAgent
      const targetType = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA) ? 'mobile' : 'pc'
      const baseSize = targetType == 'pc' ? 100 : 100
      if (targetType === 'pc') {
        const scale = doc.documentElement.clientWidth / 1920
        doc.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`
      }
      else {
        const scale = doc.documentElement.clientWidth / 375
        doc.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`
      }
    }
    setRem()
    console.log('字体大小', doc.documentElement.style.fontSize)
    doc.addEventListener('DOMContentLoaded', setRem, false)
    win.addEventListener('resize', setRem)
  })(window, document)
})

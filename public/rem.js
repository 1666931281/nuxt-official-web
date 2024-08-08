(function (win, doc) {
  if (!win?.addEventListener) return;
  function setRem() {
    const UA = navigator.userAgent;
    const targetType = /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA) ? 'mobile' : 'pc';
    const baseSize = targetType == 'pc' ? 16 : 16; // 基准字体大小，根据实际需求调整
    if (targetType === 'pc') {
      const scale = doc.documentElement.clientWidth / 1920;
      doc.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'; // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    } else {
      const scale = doc.documentElement.clientWidth / 375;
      doc.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
    }
  }
  setRem();
  doc.addEventListener('DOMContentLoaded', setRem, false);
  win.addEventListener('resize', setRem);
})(window, document);

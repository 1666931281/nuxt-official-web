/**
 * 节流函数
 * @param fn
 * @param wait
 * @returns
 */
export const throttle = (fn: any, wait: number = 80) => {
  const callback = fn;
  let timerId: NodeJS.Timeout | null = null;

  // 是否是第一次执行
  let firstInvoke = true;
  function throttled(this: any, ...args: any[]) {
    // 如果是第一次触发，直接执行
    if (firstInvoke) {
      callback.apply(this, args);
      firstInvoke = false;
      return;
    }

    // 如果定时器已存在，直接返回。
    if (timerId) {
      return;
    }

    timerId = setTimeout(() => {
      // 注意这里 将 clearTimeout 放到 内部来执行了
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      callback.apply(this, args);
    }, wait);
  }
  return throttled;
};

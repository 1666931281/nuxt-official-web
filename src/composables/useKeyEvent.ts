import { createSharedComposable } from '@vueuse/core';
export const UseKeyEvent = createSharedComposable(() => {
  const keyDown = (passingKey: string | number) => {
    return (callback: () => void) => {
      document.onkeydown = (event) => {
        let keyPressed;
        if (event.key) {
          keyPressed = event.key;
        } else {
          keyPressed = String.fromCharCode(event.keyCode);
        }
        if (keyPressed === passingKey) {
          event.preventDefault();
          callback();
        }
      };
    };
  };
  return {
    keyDown,
  };
});

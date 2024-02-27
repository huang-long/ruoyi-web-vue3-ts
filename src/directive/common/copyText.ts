/**
 * v-copyText 复制文本内容
 */
import type { Directive } from "vue";

const copyText: Directive<HTMLElement & { $copyValue: string }, string | VoidFunction> = {
  beforeMount(el, { value, arg }) {
    console.log(el, value, arg);
    // if (arg === "callback") {
    //   el.$copyCallback = value;
    // } else {
    //   el.$copyValue = value;
    //   const handler = () => {
    copyTextToClipboard(el.$copyValue);
    //     if (el.$copyCallback) {
    //       el.$copyCallback(el.$copyValue);
    //     }
    //   };
    //   el.addEventListener("click", handler);
    //   el.$destroyCopy = () => el.removeEventListener("click", handler);
    // }
  },
};

export default copyText;

function copyTextToClipboard(input: string, { target = document.body } = {}) {
  console.log(input, target);
  // const element = document.createElement('textarea');
  // const previouslyFocusedElement = document.activeElement;
  // element.value = input;
  // // Prevent keyboard from showing on mobile
  // element.setAttribute('readonly', '');
  // element.style.contain = 'strict';
  // element.style.position = 'absolute';
  // element.style.left = '-9999px';
  // element.style.fontSize = '12pt'; // Prevent zooming on iOS
  // const selection = document.getSelection();
  // const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0);
  // target.append(element);
  // element.select();
  // // Explicit selection workaround for iOS
  // element.selectionStart = 0;
  // element.selectionEnd = input.length;
  // let isSuccess = false;
  // try {
  //   isSuccess = document.execCommand('copy');
  // } catch { }
  // element.remove();
  // if (originalRange) {
  //   selection.removeAllRanges();
  //   selection.addRange(originalRange);
  // }
  // // Get the focus back on the previously focused element, if any
  // if (previouslyFocusedElement) {
  //   previouslyFocusedElement.focus();
  // }
  // return isSuccess;
}

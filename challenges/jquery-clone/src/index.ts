import fetch from 'node-fetch';

function isHTMLElement(el: Element): el is HTMLElement {
  return 'style' in el;
}

function $(selector: string) {
  const element = document.querySelector(selector);
  if (!element) {
    return null;
  }
  return {
    html(str: string) {
      element.innerHTML = str;
    },
    hide() {
      if (isHTMLElement(element)) {
        element.style.visibility = 'hidden';
      }
    },
    show() {
      if (isHTMLElement(element)) {
        element.style.visibility = 'visible';
      }
    },
    on<K extends keyof HTMLElementEventMap>(
      eventName: K,
      cb: (event: HTMLElementEventMap[K]) => void
    ) {
      if (isHTMLElement(element)) {
        element.addEventListener(eventName, cb);
      }
    },
  };
}

namespace $ {
  export async function ajax(args: {
    url: string;
    success(result: object): void;
  }) {
    try {
      const res = await fetch(args.url);
      const data = await res.json();
      if (typeof data === 'object') {
        args.success(data);
        return data;
      }
    } catch (err) {}
  }
}

export default $;

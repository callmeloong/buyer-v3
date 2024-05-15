import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFontUrl(inputString: string) {
  var match = inputString.match(/<link\s+href=['"]([^'"]+)['"]/);
  if (match) {
    return match[1].replace(/\s+/g, "+");
  } else {
    return null;
  }
}

export function convertCssVariables(cssString: string) {
  // Hàm này thực hiện việc thay thế dấu gạch dưới (_) bằng dấu gạch ngang (-) trong các biến CSS
  function replaceUnderscores(p1: string) {
    return p1.replace(/_/g, "-");
  }

  // Thay đổi tất cả các biến CSS trong :root
  cssString = cssString.replace(/:root{(.*?)}/s, function (rootContent) {
    return rootContent.replace(/(--[\w-]+):/g, replaceUnderscores);
  });

  // Thay đổi tất cả các biến CSS được sử dụng trong var(--variables_css)
  cssString = cssString.replace(/var\((--[\w-]+)\)/g, function (match, p1) {
    return "var(" + p1.replace(/_/g, "-") + ")";
  });

  return cssString;
}

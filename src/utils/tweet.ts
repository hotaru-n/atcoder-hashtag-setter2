import html from "../components/twittersearch.html";

/** ツイートボタンのHTML要素 */
const a2akit = document.getElementsByClassName("a2a_kit")[0];

/**
 * ツイートボタンのテキストを取得する
 */
export const getTweetButtonText = () => {
  if (!a2akit) return "";
  return a2akit.getAttribute("data-a2a-title");
};

/**
 * ツイートボタンのテキストを変更する
 */
export const setTweetButtonText = (text: string) => {
  if (!a2akit) return;
  a2akit.setAttribute("data-a2a-title", text);
};

export const addTweetSearchButton = (text: string) => {
  const searchURL = `https://twitter.com/search?q=${encodeURIComponent(text)}`;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const docA = doc.getElementsByTagName("a")[0];
  docA.href = searchURL;

  a2akit.insertAdjacentElement("beforeend", docA);
};

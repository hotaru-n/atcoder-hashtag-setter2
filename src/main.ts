import isContestOver from "./utils/isContestOver";
import {
  contestID,
  contestTitle,
  judgeScore,
  judgeStatus,
  pageType,
  submissionsUser,
  taskID,
  taskTitle,
} from "./utils/parser";
import {
  addTweetSearchButton,
  getTweetButtonText,
  setTweetButtonText,
} from "./utils/tweet";

(() => {
  // ネタバレ防止のため、コンテスト終了前（常設コンテストを除く）は無効とする
  if (!isContestOver()) return;

  /** コンテストハッシュタグ 例: #AtCoder_abc210_a */
  const contestHashtag = contestID ? ` #AtCoder_${contestID}` : "";
  /** 問題ハッシュタグ 例: #AtCoder_abc210_a */
  const taskHashtag = taskID ? ` #AtCoder_${taskID}` : "";
  /** ユーザーハッシュタグ 例: #AtCoder_machikane */
  const userHashtag = userScreenName ? ` #AtCoder_${userScreenName}` : "";

  // ツイートボタンのテキストを取得する
  const textOrg = getTweetButtonText();
  if (!textOrg) return;

  // ツイートボタンのテキストを編集
  let text = textOrg + contestHashtag;
  if (pageType === "task") {
    // 問題ページ
    text = `${taskTitle} - ${contestTitle}${taskHashtag}${contestHashtag}${userHashtag}`;
  } else if (pageType === "submission") {
    // 個別の提出ページ
    text = `${taskTitle} - ${submissionsUser}の提出 - 結果 ${judgeStatus} ${judgeScore}点 - ${contestTitle}${taskHashtag}${contestHashtag}${userHashtag}`;
  }

  setTweetButtonText(text);

  // タグ検索ボタンを追加

  /** 検索タグ 問題ハッシュタグ なければコンテストハッシュタグ */
  const searchTag = taskHashtag || contestHashtag;
  addTweetSearchButton(searchTag.trim());
})();

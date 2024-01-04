import {
  IsContestPermanent,
  contestId,
  contestTitle,
  hasContestEnded,
  problemId,
  problemTitle,
  userIdSubmittedBy,
} from "./consts/atcoder";

(() => {
  // コンテスト終了前で、常設コンではなければ、何らかのネタバレ防止のため何もしない
  if (!(hasContestEnded || IsContestPermanent)) {
    return;
  }

  /** コンテストハッシュタグ 例: #AtCoder_abc210_a */
  const contestHashtag = contestId ? `#AtCoder_${contestId}` : undefined;
  /** 問題ハッシュタグ 例: #AtCoder_abc210_a */
  const problemHashtag = problemId ? `#AtCoder_${problemId}` : undefined;
  /** ユーザーハッシュタグ 例: #AtCoder_machikane */
  const userHashtag = userIdSubmittedBy ? `#AtCoder_${userIdSubmittedBy}` : undefined;

  const orgtext = document.querySelector("div.a2a_kit")?.getAttribute("data-a2a-title");
  if (orgtext == null) {
    console.warn("AtCoder HashTag Setter2", "共有ボタンの取得に失敗しました。");
    return;
  }

  const text = (() => {
    if (location.pathname.match(/contests\/.+\/tasks\/.+/) != null) {
      // 問題ページ
      return `${orgtext} - ${contestTitle} ${contestHashtag} ${problemHashtag}`;
    }
    if (location.pathname.match(/contests\/.+\/submissions\/\d+/) != null) {
      // 提出詳細ページ
      return `${orgtext} - ${problemTitle} ${contestHashtag} ${problemHashtag} ${userHashtag}`;
    }
    // その他のページ
    return `${orgtext} ${contestHashtag}`;
  })();

  document.querySelector("div.a2a_kit")?.setAttribute("data-a2a-title", text);

  // HACK: beforeendだとAddToAnyボタンの次の行ができてそこに追加されてしまったので、afterbeginにした
  // HACK: 順番はcontest, problem, userにする
  if (userHashtag != null) {
    const searchUserUrl = `https://twitter.com/search?q=${encodeURIComponent(userHashtag)}`;
    const searchUserHtml = `<a class="btn btn-danger btn-xs" href="${searchUserUrl}" role="button">${userHashtag}</a>`;
    document.querySelector("div.a2a_kit")?.insertAdjacentHTML("afterbegin", searchUserHtml);
  }

  if (problemHashtag != null) {
    const searchProblemUrl = `https://twitter.com/search?q=${encodeURIComponent(problemHashtag)}`;
    const searchProblemHtml = `<a class="btn btn-primary btn-xs" href="${searchProblemUrl}" role="button">${problemHashtag}</a>`;
    document.querySelector("div.a2a_kit")?.insertAdjacentHTML("afterbegin", searchProblemHtml);
  }

  if (contestHashtag != null) {
    const searchContestUrl = `https://twitter.com/search?q=${encodeURIComponent(contestHashtag)}`;
    const searchContestHtml = `<a class="btn btn-success btn-xs" href="${searchContestUrl}" role="button">${contestHashtag}</a>`;
    document.querySelector("div.a2a_kit")?.insertAdjacentHTML("afterbegin", searchContestHtml);
  }
})();

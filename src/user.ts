// ==UserScript==
// @name            AtCoder HashTag Setter2
// @namespace       https://github.com/hotarunx
// @version         1.0.0
// @description     ツイートボタンの埋め込みテキストに情報を追加します
// @author          hotarunx
// @match           https://atcoder.jp/contests/*
// @exclude         https://atcoder.jp/contests/
// @grant           none
// @license         MIT
//
// Copyright(c) 2020 hotarunx
// This software is released under the MIT License, see LICENSE or https://github.com/hotarunx/AtCoderMyExtensions/blob/master/LICENSE.
//
// ==/UserScript==

"use strict";

window.addEventListener("load", function () {
  const contestTitle =
    this.document.getElementsByClassName("contest-title")[0].textContent;
  console.log("contestTitle :>> ", contestTitle);

  /**
   * ページのURL \
   * 例 (5)['https:', '', 'atcoder.jp', 'contests', 'abc210']
   */
  const url = parseURL(this.location.href);

  /** コンテストID 例: abc210 */
  const contestId = url[4];
  /**
   * ページタイプ 例: tasks, clarifications, submit, submissions, standings, custom_test, editorial
   */
  const pageType = url.length >= 6 ? url[5] : "";
  /** 問題ID 例: abc210_a */
  const taskId = (() => {
    // urlの長さが7未満のとき 下記の問題IDが無いページ
    if (url.length < 7) return "";
    if (pageType === "tasks") {
      // 問題ページのとき
      // 例: https://atcoder.jp/contests/abc210/tasks/abc210_a
      // URLに含まれる問題IDを返す
      return url[6];
    } else if (pageType === "submissions" && url[6] !== "me") {
      // 提出詳細ページのとき
      // 例: https://atcoder.jp/contests/abc210/submissions/24282585
      // テキストが`問題`のテーブル要素の隣のリンクのURLに含まれる問題IDを返す

      // テーブル要素集合
      const thTags = document.getElementsByTagName("th");
      const thTagsArray = Array.prototype.slice.call(thTags);
      // テキストが`問題`の要素の次の要素
      const taskLink = thTagsArray.filter((elem: HTMLTableCellElement) => {
        const text = elem.innerText;
        return text.indexOf("問題") !== -1 || text.indexOf("Task") !== -1;
      })[0].nextElementSibling.lastElementChild;
      // URLに含まれる問題IDを返す
      const taskURLParsed = parseURL(taskLink.href);
      return taskURLParsed[6];
    }
    // それ以外のとき 問題IDが無いページ
    return "";
  })();
  /** 問題名 例: A - Cabbages */
  const taskTitle = (() => {
    // urlの長さが7未満のとき 下記の問題名が無いページ
    if (url.length < 7) return "";
    if (pageType === "tasks") {
      // 問題ページのとき
      // 例: https://atcoder.jp/contests/abc210/tasks/abc210_a
      // URLに含まれる問題名を返す
      return document
        .getElementsByClassName("h2")[0]
        .textContent?.trim()
        .replace(/\n.*/i, "");
    } else if (pageType === "submissions" && url[6] !== "me") {
      // 提出詳細ページのとき
      // 例: https://atcoder.jp/contests/abc210/submissions/24282585
      // テキストが`問題`のテーブル要素の隣のリンクのURLに含まれる問題名を返す

      // テーブル要素集合
      const thTags = document.getElementsByTagName("th");
      const thTagsArray = Array.prototype.slice.call(thTags);
      // テキストが`問題`の要素の次の要素
      const taskLink = thTagsArray.filter((elem: HTMLTableCellElement) => {
        const text = elem.innerText;
        return text.indexOf("問題") !== -1 || text.indexOf("Task") !== -1;
      })[0].nextElementSibling.lastElementChild;
      // URLに含まれる問題名を返す
      return taskLink.textContent;
    }
    // それ以外のとき 問題名が無いページ
    return "";
  })();

  const submissionsUser = "";
  const judgeStatus = "";

  /** コンテストハッシュタグ 例: #AtCoder_abc210_a */
  const contestHashtag = ` #AtCoder_${contestId}`;
  /** 問題ハッシュタグ 例: #AtCoder_abc210_a */
  const taskHashtag = taskId !== "" ? ` #AtCoder_${taskId}` : "";

  // ツイートボタンのテキストにハッシュタグを追加する
  /** ツイートボタンのHTML要素 */
  const a2a_kit = this.document.getElementsByClassName("a2a_kit")[0];
  /** ツイートボタンのテキスト */
  const a2a_title = a2a_kit.getAttribute("data-a2a-title");
  a2a_kit.setAttribute(
    "data-a2a-title",
    taskTitle + a2a_title + contestHashtag + taskHashtag
  );

  const a2a_title_new = a2a_kit.getAttribute("data-a2a-title");
  console.log("tweet text\n", a2a_title_new);
  console.log(taskTitle);
});

/**
 * URLをパースする \
 * パラメータを消す \
 * 例 \
 * in:  https://atcoder.jp/contests/abc210?lang=en \
 * out: (5)['https:', '', 'atcoder.jp', 'contests', 'abc210']
 */
function parseURL(url: String) {
  // 区切り文字`/`で分割する
  // ?以降の文字列を削除してパラメータを削除する
  return url.split("/").map((x) => x.replace(/\?.*/i, ""));
}

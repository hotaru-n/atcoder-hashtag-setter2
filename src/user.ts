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

/** ページタイプ型のリテラル 問題ページ、順位表ページなどを意味する */
const pageTypes = [
  "tasks",
  "clarifications",
  "submit",
  "submissions",
  "submission",
  "score",
  "standings",
  "custom_test",
  "editorial",
  undefined,
] as const;

/**
 * ページタイプ型
 * 例: tasks, submissions, standings, ...
 * 提出詳細ページはsubmission
 * コンテストのトップまたは想定外ならundefined
 * その他はURLの6番目の文字列
 */
type pageType = typeof pageTypes[number];

/** ページタイプ型の型ガード */
function isPageType(name: string | undefined): name is pageType {
  return pageTypes.some((value) => value == name);
}

/**
 * ページ情報型
 * コンテスト名、コンテストIDをなどを格納するオブジェクト
 */
type Info = {
  contestTitle: string;
  contestId: string;
  pageType: pageType;
  taskTitle: string | undefined;
  taskId: string | undefined;
  submissionsUser: string | undefined;
  judgeStatus: string;
};

/**
 * ページからページ情報をパースして返す
 * @returns ページ情報
 */
function getInfo() {
  /** コンテスト名 例: AtCoder Beginner Contest 210 */
  const contestTitle: Info["contestTitle"] =
    document.getElementsByClassName("contest-title")[0].textContent ?? "";

  /**
   * ページのURL \
   * 例 (5)['https:', '', 'atcoder.jp', 'contests', 'abc210']
   */
  const url = parseURL(location.href);

  /** コンテストID 例: abc210 */
  const contestId = url[4];

  /**ページタイプ 例: tasks, submissions, standings, ... */
  const pageType = (() => {
    if (url.length < 6) return undefined;
    if (!isPageType(url[5])) return undefined;
    if (url.length >= 7 && url[6] !== "me") return "submission";
    return url[5];
  })();

  /**
   * 問題ID 例: abc210_a \
   * 問題名 A - Cabbages
   */
  const { taskId, taskTitle } = ((): {
    taskId: Info["taskId"];
    taskTitle: Info["taskTitle"];
  } => {
    // urlの長さが7未満のとき 下記の問題ID、問題名が無いページ
    if (url.length < 7) return { taskId: undefined, taskTitle: undefined };
    if (pageType === "tasks") {
      // 問題ページのとき
      // URLに含まれる問題ID、問題名を返す

      const taskTitle = document
        .getElementsByClassName("h2")[0]
        .textContent?.trim()
        .replace(/\n.*/i, "");

      return { taskId: url[6], taskTitle: taskTitle };
    } else if (pageType === "submission") {
      // 提出詳細ページのとき

      // テーブル要素集合
      const tdTags = document.getElementsByTagName("td");
      const tdTagsArray: HTMLTableCellElement[] =
        Array.prototype.slice.call(tdTags);

      // 問題の表セル要素（前の要素のテキストが`問題`の要素）を探す
      const taskCell = tdTagsArray.filter((elem: HTMLTableCellElement) => {
        const prevElem = elem.previousElementSibling;
        const text = prevElem?.textContent;
        if (typeof text === "string") return ["問題", "Task"].includes(text);
        return false;
      })[0];
      const taskLink = taskCell.getElementsByTagName("a")[0];

      // URLに含まれる問題ID、問題名を返す
      const taskURLParsed = parseURL(taskLink.href);
      return {
        taskId: taskURLParsed[6],
        taskTitle: taskLink.textContent ?? undefined,
      };
    }

    // それ以外のとき 問題ID、問題名が無いページ
    return { taskId: undefined, taskTitle: undefined };
  })();

  /** 提出ユーザー 例: machikane */
  const submissionsUser = (() => {
    if (pageType !== "submission") return undefined;
    // 提出詳細ページのとき

    // テーブル要素集合
    const thTags = document.getElementsByTagName("td");
    const thTagsArray = Array.prototype.slice.call(thTags);

    // ユーザーの表セル要素（前の要素のテキストが`ユーザ`の要素）を探す
    const userCell = thTagsArray.filter((elem: HTMLTableCellElement) => {
      const prevElem = elem.previousElementSibling;
      const text = prevElem?.textContent;
      if (typeof text === "string") return ["ユーザ", "User"].includes(text);
      return false;
    })[0];

    return userCell.textContent.trim();
  })();

  /** 提出結果 例: AC */
  const judgeStatus = (() => {
    if (pageType !== "submission") return undefined;
    // 提出詳細ページのとき

    // テーブル要素集合
    const thTags = document.getElementsByTagName("td");
    const thTagsArray = Array.prototype.slice.call(thTags);

    // 結果の表セル要素（前の要素のテキストが`結果`の要素）を探す
    const statusCell = thTagsArray.filter((elem: HTMLTableCellElement) => {
      const prevElem = elem.previousElementSibling;
      const text = prevElem?.textContent;
      if (typeof text === "string") return ["結果", "Status"].includes(text);
      return false;
    })[0];

    return statusCell.textContent.trim();
  })();

  return {
    contestTitle,
    contestId,
    pageType,
    taskTitle,
    taskId,
    submissionsUser,
    judgeStatus,
  };
}

window.addEventListener("load", function () {
  const info = getInfo();
  // TODO: デバッグ用
  console.log("info :>> ", info);

  // /** コンテストハッシュタグ 例: #AtCoder_abc210_a */
  // const contestHashtag = ` #AtCoder_${contestId}`;
  // /** 問題ハッシュタグ 例: #AtCoder_abc210_a */
  // const taskHashtag = taskId !== "" ? ` #AtCoder_${taskId}` : "";

  // // ツイートボタンのテキストにハッシュタグを追加する
  // /** ツイートボタンのHTML要素 */
  // const a2a_kit = this.document.getElementsByClassName("a2a_kit")[0];
  // /** ツイートボタンのテキスト */
  // const a2a_title = a2a_kit.getAttribute("data-a2a-title");
  // a2a_kit.setAttribute(
  //   "data-a2a-title",
  //   taskTitle + a2a_title + contestHashtag + taskHashtag
  // );

  // const a2a_title_new = a2a_kit.getAttribute("data-a2a-title");
  // console.log("tweet text\n", a2a_title_new);
  // console.log(taskTitle);
});

/**
 * URLをパースする \
 * パラメータを消す \
 * 例 \
 * in:  https://atcoder.jp/contests/abc210?lang=en \
 * out: (5)['https:', '', 'atcoder.jp', 'contests', 'abc210']
 */
function parseURL(url: string) {
  // 区切り文字`/`で分割する
  // ?以降の文字列を削除してパラメータを削除する
  return url.split("/").map((x) => x.replace(/\?.*/i, ""));
}

# AtCoder HashTag Setter2

AtCoderのツイートボタンのテキストにハッシュタグ + etcを追加します。

[AtCoder HashTag Setter](https://greasyfork.org/ja/scripts/422324-atcoder-hashtag-setter)をフルスクラッチしたスクリプトです。

> AtCoderのTwitter Shareボタンの文章にハッシュタグを追加します。
> 追加されるハッシュタグのフォーマットは以下のようになります。
> ・問題ページ,提出ページでは#AtCoder_(ProblemId)
> ・その他コンテストページでは#AtCoder_(ContestId)  
> [AtCoder HashTag Setter](https://greasyfork.org/ja/scripts/422324-atcoder-hashtag-setter)より引用

## ⚠️注意⚠️

**コンテスト終了前に問題名、ジャッジ結果をツイートしないでください。**

## AtCoder HashTag Setterとの違い

1. 問題ページと提出詳細ページにおいて、問題とコンテスト両方のハッシュタグを追加
2. 問題ページのテキストにコンテスト名を追加
3. 提出詳細ページのテキストに問題名、提出ユーザー、結果を追加
4. URLにパラメーターが含まれるとき正しいハッシュタグを追加できない問題を解決

## 例

* taskId: abc210_a
* contestId: abc210

### 問題ページ

`A - Cabbages - AtCoder Beginner Contest 210 #AtCoder_abc210_a #AtCoder_abc210`

### 提出詳細ページ

`提出 #24282585 - A - Cabbages - AtCoder Beginner Contest 210 #AtCoder_abc210_a #AtCoder_abc210`

### その他のページ

`順位表 - AtCoder Beginner Contest 210 #AtCoder_abc210`

## ライセンス

MITです。

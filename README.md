# AtCoder HashTag Setter2

AtCoderのツイートボタンの埋め込みテキストにハッシュタグ + etcを追加します。

問題ハッシュタグ、コンテストハッシュタグ、問題名、提出結果、得点を表示します。

[AtCoder HashTag Setter](https://greasyfork.org/ja/scripts/422324-atcoder-hashtag-setter)をフルスクラッチしたスクリプトです。

> AtCoderのTwitter Shareボタンの文章にハッシュタグを追加します。
> 追加されるハッシュタグのフォーマットは以下のようになります。
> ・問題ページ,提出ページでは#AtCoder_(ProblemId)
> ・その他コンテストページでは#AtCoder_(ContestId)  
> [AtCoder HashTag Setter](https://greasyfork.org/ja/scripts/422324-atcoder-hashtag-setter)より引用

## ⚠️注意⚠️

**ルールで許可されている場合を除き、コンテスト終了前に問題名、ジャッジ結果、得点をツイートしないでください。**

これらはコンテストのルールに違反する可能性があります。

予防策として、コンテスト終了前（常設コンテストを除く）は、ツイートボタンのテキストに問題名、ジャッジ結果、得点を含めない処理を入れています。

[ルール \- AtCoder Beginner Contest 210](https://atcoder.jp/contests/abc210/rules)

## AtCoder HashTag Setterとの違い

1. 問題ページと提出詳細ページにおいて、問題とコンテスト両方のハッシュタグを追加
2. 問題ページのテキストにコンテスト名を追加
3. 提出詳細ページのテキストに問題名、提出ユーザー、結果を追加
4. URLにパラメーターが含まれるとき正しいハッシュタグを追加できない問題を解決

## 例

* taskId: abc210_a
* contestId: abc210
* 問題ハッシュタグ： #AtCoder_abc210_a
* コンテストハッシュタグ： #AtCoder_abc210

[A \- Cabbages](https://atcoder.jp/contests/abc210/tasks/abc210_a)

### 問題ページ

```text
A - Cabbages - AtCoder Beginner Contest 210 #AtCoder_abc210_a #AtCoder_abc210
```

### 提出詳細ページ

```text
machikaneさんのA - Cabbagesへの提出 #24282585
結果：AC
得点：100
AtCoder Beginner Contest 210 #AtCoder_abc210_a #AtCoder_abc210
```

### その他のページ

```text
順位表 - AtCoder Beginner Contest 210 #AtCoder_abc210
```

## ライセンス

MITです。

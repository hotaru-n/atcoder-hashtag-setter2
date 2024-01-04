# AtCoder HashTag Setter2

AtCoder の共有ボタンの埋め込みテキストにハッシュタグを追加して、コンテスト名または問題名を補完して、ハッシュタグを X で検索するボタンを追加します。

問題ハッシュタグ、コンテストハッシュタグ、ユーザーハッシュタグの 3 タグを追加します。
さらに埋め込みテキストにコンテスト名または問題名が無いページがあるので、それを追加します。

ハッシュタグを X で検索するボタンを追加します。

## ハッシュタグ

- 問題ハッシュタグ： abc210_a → #AtCoder_abc210_a
- コンテストハッシュタグ： abc210 → #AtCoder_abc210
- ユーザーハッシュタグ： machkane → #AtCoder_machikane

[A \- Cabbages](https://atcoder.jp/contests/abc210/tasks/abc210_a)

### 問題ページ

```diff
-A - Cabbages
+A - Cabbages - AtCoder Beginner Contest 210 #AtCoder_abc210_a #AtCoder_abc210
```

### 提出詳細ページ

```diff
-提出 #49012776 - AtCoder Beginner Contest 210
+提出 #49012776 - AtCoder Beginner Contest 210 - A - Cabbages #AtCoder_abc210_a #AtCoder_abc210 #AtCoder_machikane
```

### その他のページ

```diff
-順位表 - AtCoder Beginner Contest 210
+順位表 - AtCoder Beginner Contest 210 #AtCoder_abc210
```

## 真似した拡張機能・ユーザースクリプト

アイデアのみ真似ました。

[AtCoder HashTag Setter](https://greasyfork.org/ja/scripts/422324-atcoder-hashtag-setter)

## GitHub リポジトリ

<https://github.com/hotarupoyo/atcoder-hashtag-setter2>

## GreasyFork からインストール

<https://greasyfork.org/ja/scripts/440488-atcoder-hashtag-setter2>

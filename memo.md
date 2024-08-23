# 📝 2024/08/23

## 外部にfps 取ってこれる？

`p5` と生成したcanvas って同等？

# 📝 2024/08/15

## `8.4.1 組み立て` 速度

`2738`
`2872`

### 結末

for をいらんところで回してたので遅かった




# 📝 2024/08/08

## `p.color` と`p.fill` の色指定関係

`color` オブジェクトは、alpha 値も指定するなら、一緒に宣言をして

格納をしないと、反映できない？

# 📝 2024/08/03

## p5.js で書きかわった関数

ざっと、入れていく

- `size`
  - `createCanvas`

# 📝 2024/08/02

## 写経開始

### ファイル命名規則

完成した`.js` は、項目の数値のみで表記。

### 描画サイズ

携帯の縦位置でもいい感じにできるように、調整をしている。

リサイズ関係は、後ほど考える

`div` 内の`canvas` の下部に空白ができる件は、
`canvas` タグに、`display: block;` で回避 ï

## `WKwWebView` まわり

### `title` の動的変化の反映

`document.title` を`.js` 側で書き換える（項目の名称）ため、delegate の`didFinishNavigation` 内ではなく`viewDidAppear` （View のサイクル内）で取得するようにしている。

`didFinishNavigation` から、`webView.title()` すると`.html` で記載された内容に上書きされてしまうため。

[addObserver:forKeyPath:options:context: | Apple Developer Documentation](https://developer.apple.com/documentation/objectivec/nsobject/1412787-addobserver?language=objc) との手法を見つけたが、実装して確認はしていない。

### 背景色など

本の sample に近づけるために、（ブラウザ処理側の）style で、`lightgray` と`darkgray` を適用。

今後の見た目で、面倒なことがあれば、変更予定。

# 📝 2024/07/31

## 開始

[GitHub - pome-ta/p5jsSetUpTest](https://github.com/pome-ta/p5jsSetUpTest) ここの構成環境をコピーしつつ、整理したもので始める

### ディレクトリ構成

`src` にゴリっと、投げ入れていたが、制作時に必要不必要な状態で脳のリソースを持たせたくない。
気持ち改変を行なっている。

- src
  - `node_modules` から呼び出して、変化させる下準備
- public
  - 基本的に何か操作する
- (dist)
  - `.gitignore` にてないない。されてしまうので回避

webpack とかだと、この辺をよしなにやってくれるが、今回は基本的に手でモリモリと書いていくので
正直なところは不要かもしれない。

### `rollup` での吐き出し

Codemirror からの付き合いがになるが、他にカジュアルに ESM やってくれるならそれにしたい

#### ビルド時

- p5
  - `eval` あるよ、と警告あり
    - `p5.min.js` は、警告が出ない
- eruda
  - クソデカ空白ログを吐いているみたいだが、ログの内容が読み取れない

## 運用と書き方のルール

思いつきのままに雑多に書く

- p5 の実行は、グローバルではなくインスタンスモードで行う
- p5 依存のメソッドは、アローで呼び出し処理を書く
- 独自のは、`function` 宣言して書いていく
- p5 を、`window.p5` として、持たせる

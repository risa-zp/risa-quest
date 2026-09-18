# RISA QUEST — GitHub Pages 公開・更新ガイド

## 公開先

- GitHubアカウント: risa-zp
- リポジトリ名: risa-quest
- 公開後のWebサイトURL: https://risa-zp.github.io/risa-quest/
- リポジトリURL: https://github.com/risa-zp/risa-quest

URLを入力しただけでは公開されません。初回は、下のアップロードとPages設定が必要です。

## 初回公開（ブラウザーだけでできます）

1. GitHubにログインして、右上の「＋」から「New repository」を選びます。
2. Ownerを `risa-zp`、Repository nameを `risa-quest`、公開範囲を **Public** にします。「Add README」をオンにして「Create repository」を押します。すでに作成済みならこの手順は不要です。
3. リポジトリの「Code」画面で「Add file」→「Upload files」を選びます。
4. このフォルダの `index.html`、`calendar.html`、`life-management.html`、`portfolio.html`、`style.css`、`script.js`、`adventure-map.png`、`.nojekyll`、`README.md`、`PUBLISHING.md` をアップロードします。フォルダごと入れ子にせず、index.htmlがリポジトリの一番上に見える状態にしてください。
5. 「Commit changes」を押して保存します。
6. 「Settings」→左側の「Pages」を開きます。
7. 「Build and deployment」の「Source」を **Deploy from a branch** にします。
8. 「Branch」を **main**、フォルダを **/(root)** にして「Save」を押します。
9. 「Actions」で `pages build and deployment` の完了を待ちます。「Settings → Pages」に「Your site is live at」と表示されたURLを開きます。

このサイトはHTML・CSS・JavaScriptだけで動くため、npmのインストール、ビルド、APIキーは不要です。独自のActionsワークフローを追加する必要もありません。

## 次回からの更新

1. 修正したファイルを「Add file → Upload files」で同じ場所へアップロードします。
2. 「Commit changes」でmainに保存します。
3. 自動で再公開されます。「Actions」の完了後にサイトを再読み込みしてください。

短い文章は、GitHubでHTMLファイルを開き、鉛筆アイコンから編集して「Commit changes」でも更新できます。

## どのファイルを編集するか

| ファイル | 内容 |
| --- | --- |
| index.html | 自己紹介、制作物一覧、学習・技術、強み、将来像、次の挑戦 |
| life-management.html | 生活管理Webアプリの新しい詳細 |
| calendar.html | 従来の詳細ページ（新ページへの案内付き） |
| portfolio.html | このポートフォリオの制作記録 |
| style.css | 色、文字サイズ、余白、アニメーション、スマートフォン表示 |
| script.js | メニュー、スクロール時の表示、動きの停止・再開 |
| adventure-map.png | 背景の冒険マップ |

空欄は `class="blank"` の要素として残しています。その項目の内容が決まったら、対応する `<dd>` 内の空欄要素を本文やリンクへ置き換えます。未提供のURLに仮のリンクを付けていません。

## 今後追加できる内容

- 生活管理アプリの実際のスクリーンショット、GitHub URL、公開アプリURL。
- 具体的な修正コードと検証結果、実際のプロンプト例。
- ポートフォリオを見てもらった人からの感想。
- 公開する連絡先、プロフィール画像。

目標・振り返りは実装済み、ユーザー登録・ログインは未完成として反映済みです。企業固有の応募理由は掲載していません。

## 動きの設定

右上の「Ⅱ」または「動きを止める」で演出を停止できます。設定は閲覧者の端末内だけに保存します。OSの「視差効果を減らす」などにも対応しています。スクロール時の表示は初回だけで、文字を読み直すたびに消えません。

## 公開の仕組み

リポジトリはソースコードの保存場所、GitHub PagesはWebサイトの表示先です。紹介する方へ送るのは **github.io のURL** です。Publicリポジトリのソースも公開されます。パスワード、APIキー、掲載したくない個人情報は追加しないでください。

公式ガイド: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

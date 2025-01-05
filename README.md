# 概要

GCP の Vision AI を用いたサンプルコード。
レシートに印字された内容を読み取らせる。

# 前提条件

- GCP のコンソールからプロジェクトを作成しておくこと
- Firebase のコンソールからプロジェクトを作成しておくこと

# 初回セットアップ

## GCP との連携

コマンドラインから以下を実行。

```shell
gcloud init
```

以下のような出力がされるので、リンクをブラウザから開く。

```
Go to the following link in your browser:

https://xxxxxxx
```

ブラウザ上で GCP へのログインを行うと、認証コードが表示される。
そのコードをコマンドライン上で入力すると、連携可能な GCP プロジェクト一覧が表示されるので選択する。

## Vision AI の有効化

以下を実行し、GCP プロジェクト上で Vision AI を使用可能な状態にする。

```shell
gcloud services enable vision.googleapis.com
```

※現在有効なサービス一覧を確認したい場合は下記のコマンドを実行する。

```shell
gcloud services list --enabled
```

## Firebase との連携

以下を実行。

```shell
firebase login
```

ブラウザが起動し、Firebase にログインする。その後連携が成功する旨が表示される。

続いて、以下のコマンドを実行し、 Functions を選択する。選択はスペース+エンターで行う。

```shell
firebase init
```

その後、連携する Firebase プロジェクトを選択する。対話形式で言語などの設定を進めていくと完了する。

## 画像をストレージにアップロード

バケットの作成

```shell
cloud storage buckets create gs://my-test-bucket-20250105
```

ローカルのテスト画像をコピー

```shell
gsutil cp ./receipt-test.jpg gs://my-test-bucket-20250105/
```

※バケットの名前は`functions/src/index.ts`と合わせておくこと。

# テスト実行

functions 以下で実行する。Firebase のエミュレータが起動する。

```shell
pnpm run start
```

# 概要

GCP の Vision AI を用いたサンプルコード。  
レシートに印字された内容を読み取り、Cloud Run 上で動作する検証用スクリプト。

---

## 前提条件

1. **GCP プロジェクトの作成**
   - Google Cloud Console から GCP プロジェクトを作成しておく。
2. **Vision AI API の有効化**

   - 対象プロジェクトで Vision AI API を有効にしておく。

3. **Cloud Storage のバケット作成**

   - バケットを作成し、レシート画像をアップロードしておく。

4. **Google Cloud CLI のセットアップ**
   - [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) がローカル環境にインストール済みであること。

---

## 初回セットアップ

### 1. GCP との連携

以下を実行し、GCP プロジェクトを設定。

```shell
gcloud init
```

以下のような出力がされるので、リンクをブラウザで開き、認証を行う。

```
Go to the following link in your browser:

https://xxxxxxx
```

ブラウザ上で認証後、ターミナルに戻り、GCP プロジェクトを選択する。

### 2. Vision AI API の有効化

Vision AI を有効化する。

```shell
gcloud services enable vision.googleapis.com
```

現在有効なサービス一覧を確認したい場合は以下を実行。

```shell
gcloud services list --enabled
```

### 3. Cloud Storage のバケット作成と画像アップロード

以下のコマンドでバケットを作成

```shell
gcloud storage buckets create gs://my-test-bucket-20250105
```

ローカルのテスト画像を Cloud Storage にコピー。

```shell
gsutil cp ./receipt-test.jpg gs://my-test-bucket-20250105/
```

## ローカル開発環境のセットアップ

依存関係のインストール

```shell
pnpm install
```

## Cloud Run へのデプロイ

### 1. Docker イメージのビルドとアップロード

Docker イメージをビルドして Google Container Registry にアップロード。

```shell
gcloud builds submit --tag gcr.io/<PROJECT_ID>/vision-api-app
```

### 2.Cloud Run へのデプロイ

Cloud Run へデプロイ。

```shell
gcloud run deploy vision-api-app \
  --image gcr.io/<PROJECT_ID>/vision-api-app \
  --platform managed \
  --region REGION \
  --allow-unauthenticated
```

## テスト実行

Cloud Run のエンドポイントがデプロイされたら、以下のようにテスト実行を行う。

テストデータの送信。

```shell
curl -X POST https://YOUR_CLOUD_RUN_URL/analyze-receipt \
-H "Content-Type: application/json" \
-d '{
  "filePath": "gs://my-test-bucket-20250105/receipt-test.jpg"
}'
```

レスポンス例

```json
[
  {
    "locale": "en",
    "description": "TOTAL: $12.34\n",
    "boundingPoly": {
      "vertices": [
        { "x": 10, "y": 20 },
        { "x": 200, "y": 20 },
        { "x": 200, "y": 50 },
        { "x": 10, "y": 50 }
      ]
    }
  }
]
```

## 注意事項

### 1. GCP 権限の設定

- 使用するサービスアカウントに以下の IAM 権限を付与してください。
  - Coud Storage Object Viewer
  - Cloud Vision API User

### 2. 課金管理

- Vision AI API の利用には課金が発生します。無料枠を超えないようご注意ください。

## ディレクトリ構成

```
.
├── src/
│   └── index.ts  # メインスクリプト
├── dist/         # ビルド成果物（自動生成）
├── .eslintrc.js
├── package.json
├── tsconfig.json
└── devcontainer/
    └── Dockerfile
```

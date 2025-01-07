# Node.jsベースのイメージを使用
FROM node:18

# UID/GIDを一致させる
ARG LOCAL_UID=1000
ARG LOCAL_GID=1000
RUN groupmod -g ${LOCAL_GID} node && \
    usermod -u ${LOCAL_UID} -g ${LOCAL_GID} node

# 必要なツールをインストール
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# pnpmのインストール
RUN npm install -g pnpm

# Google Cloud SDKのインストール (非対話モードで)
ENV CLOUD_SDK_VERSION=439.0.0
RUN curl -sSL https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz | tar -xz && \
    ./google-cloud-sdk/install.sh --quiet

# gcloudをパスに追加
ENV PATH="/google-cloud-sdk/bin:${PATH}"

# 作業ディレクトリを設定
WORKDIR /workspace

# 初回ビルド時にロックファイルを生成
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 必要な拡張機能
RUN npm install -g typescript

# 作業ディレクトリのルート設定
WORKDIR /workspace
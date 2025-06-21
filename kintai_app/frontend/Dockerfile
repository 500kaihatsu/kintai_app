# 開発用（npm start）
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# 依存ファイルだけ先にコピーしてinstall（キャッシュ効かせる）
COPY package*.json ./
RUN npm install

# アプリ全体をコピー
COPY . .

# React開発サーバー起動（ホットリロード付き）
CMD ["npm", "start"]

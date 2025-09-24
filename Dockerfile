# ========================
#  Builderステージ（本番用ビルド用）
# ========================
FROM node:18-alpine AS builder
WORKDIR /app

# 依存関係だけ先にコピー
COPY src/package*.json ./
RUN npm install

# ソースコピー
COPY src ./

# 本番ビルド
RUN npm run build

# ========================
#  開発用ステージ
# ========================
FROM node:18-alpine AS dev
WORKDIR /app

# 開発依存インストール
COPY src/package*.json ./
RUN npm install

# ソースコピー（ホットリロード用）
COPY src ./

# 開発サーバー起動
CMD ["npm", "run", "dev"]
EXPOSE 3000

# ========================
# 3️⃣本番用ステージ
# ========================
FROM node:18-alpine AS prod
WORKDIR /app

# builderから必要な成果物だけコピー
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 本番サーバー起動
CMD ["npm", "run", "start"]
EXPOSE 3000


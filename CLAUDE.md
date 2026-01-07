# LumiPop

夜間光と人口の関係性を可視化するWebアプリケーション。

## プロジェクト概要

- **目的**: 衛星画像から取得した夜間光データと人口データの相関を地図上で可視化
- **対象**: 全世界
- **公開先**: GitHub Pages

## 技術スタック

- **フロントエンド**: React 18 + TypeScript + Vite
- **地図**: deck.gl + MapLibre GL JS
- **チャート**: Recharts
- **スタイル**: Tailwind CSS
- **状態管理**: Zustand
- **データ処理**: Python (事前処理)

## ディレクトリ構成

```
lumipop/
├── docs/                 # 仕様書
├── scripts/preprocess/   # Python前処理スクリプト
├── src/                  # フロントエンドソース
│   ├── components/       # Reactコンポーネント
│   ├── hooks/            # カスタムフック
│   ├── stores/           # Zustand ストア
│   ├── types/            # 型定義
│   └── utils/            # ユーティリティ関数
├── public/data/          # 処理済みデータ
└── .github/workflows/    # CI/CD
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run typecheck

# Lint
npm run lint
```

## データソース

- **夜間光**: NASA VIIRS DNB (Black Marble)
- **人口**: WorldPop / GPW
- **境界**: Natural Earth

## 詳細仕様

詳細は [docs/SPECIFICATION.md](./docs/SPECIFICATION.md) を参照。

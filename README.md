# TypeScript講座

完全初心者のためのプログラミング入門講座サイトです。

## サイト構成

- 全18回のレッスン
- VSCodeのインストールからReactまで段階的に学習
- Astro製の静的サイト

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

## 画像の入れ替え手順

現在、スクリーンショットはプレースホルダー画像（SVG）になっています。
実際の画像に入れ替える手順は以下の通りです。

### 1. 画像の保存場所

```
src/content/lessons/images/
```

### 2. 画像ファイル一覧

各レッスンで使用する画像ファイル名は以下の通りです。

| ファイル名 | 説明 |
|-----------|------|
| `vscode-official-site.svg` | VSCode公式サイトのトップページ |
| `download-button.svg` | ダウンロードボタンの場所 |
| `installer-file.svg` | ダウンロードしたファイル |
| `license-agreement.svg` | 使用許諾契約書の画面 |
| `install-location.svg` | インストール先の選択画面 |
| `additional-tasks.svg` | 追加タスクの選択画面 |
| `installing.svg` | インストール中の画面 |
| `install-complete.svg` | インストール完了画面 |
| `vscode-initial.svg` | VSCodeの初期画面 |
| `extensions-icon.svg` | 拡張機能アイコンの場所 |
| `search-japanese.svg` | japanese と入力した検索ボックス |
| `install-japanese-pack.svg` | Japanese Language Packのインストールボタン |
| `restart-button.svg` | 再起動ボタン |
| `vscode-japanese.svg` | 日本語化されたVSCode |
| ... | （その他多数） |

### 3. 入れ替え手順

1. **スクリーンショットを撮影**
   - 推奨サイズ: 幅 800px 程度
   - 形式: PNG または JPG

2. **ファイル名を変更**
   - 拡張子を `.svg` から `.png` または `.jpg` に変更
   - 例: `vscode-official-site.png`

3. **画像を配置**
   - `src/content/lessons/images/` フォルダに保存

4. **Markdownの参照を更新**
   - `src/content/lessons/` 内の各 `.md` ファイルを編集
   - 画像参照の拡張子を変更
   ```markdown
   # 変更前
   ![screenshot: VSCode公式サイト](./images/vscode-official-site.svg)

   # 変更後
   ![screenshot: VSCode公式サイト](./images/vscode-official-site.png)
   ```

5. **一括置換（オプション）**
   ```bash
   # すべての .svg 参照を .png に置換
   cd src/content/lessons
   sed -i 's/\.svg)/.png)/g' *.md
   ```

### 4. 確認

```bash
npm run dev
```

ブラウザで `http://localhost:4321/` を開いて画像が正しく表示されるか確認してください。

## デプロイ

Cloudflare Pagesにデプロイ予定です。

## ライセンス

Private
